# Table Slot Limitation System

## 📋 Overview

Sistem limitasi slot meja untuk restaurant reservation. Setiap ukuran meja (1-8 orang) memiliki **maksimal 2 slot** yang tersedia untuk setiap kombinasi tanggal dan waktu.

## 🎯 Concept

### Slot Allocation
Restoran memiliki keterbatasan meja untuk setiap ukuran party:

| Table Size | Available Slots | Total Capacity per Time Slot |
|------------|-----------------|------------------------------|
| 1 person   | 2 slots         | 2 guests max                 |
| 2 persons  | 2 slots         | 4 guests max                 |
| 3 persons  | 2 slots         | 6 guests max                 |
| 4 persons  | 2 slots         | 8 guests max                 |
| 5 persons  | 2 slots         | 10 guests max                |
| 6 persons  | 2 slots         | 12 guests max                |
| 7 persons  | 2 slots         | 14 guests max                |
| 8 persons  | 2 slots         | 16 guests max                |

**Total Maximum Capacity per Time Slot**: 72 guests (jika semua slot terisi penuh)

## 🔧 Technical Implementation

### 1. Data Structure

#### TypeScript Interfaces

```typescript
interface TableSlot {
  tableSize: number; // 1-8 people
  availableSlots: number; // 0-2
  reservedSlots: Reservation[];
}

interface Reservation {
  slotNumber: 'slot1' | 'slot2';
  userId: string;
  guestName: string;
  confirmedAt: string; // ISO timestamp
  confirmationNumber: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  peopleCount: number;
}

interface AvailabilityCheck {
  available: boolean;
  remainingSlots: number; // 0, 1, or 2
  totalSlots: number; // Always 2
  bookedSlots: number; // 0, 1, or 2
}
```

#### Firebase Database Structure

```json
{
  "reservations": {
    "2024-08-30": {
      "18:30": {
        "1-person": {
          "slot1": {
            "userId": "user123",
            "guestName": "John Doe",
            "confirmedAt": "2024-08-20T10:30:00Z",
            "confirmationNumber": "RES-2408-0001",
            "status": "confirmed"
          },
          "slot2": null
        },
        "4-person": {
          "slot1": {
            "userId": "user456",
            "guestName": "Jane Smith",
            "confirmedAt": "2024-08-22T14:15:00Z",
            "confirmationNumber": "RES-2408-0002",
            "status": "confirmed"
          },
          "slot2": {
            "userId": "user789",
            "guestName": "Bob Wilson",
            "confirmedAt": "2024-08-23T09:45:00Z",
            "confirmationNumber": "RES-2408-0003",
            "status": "confirmed"
          }
        }
      }
    }
  },
  "config": {
    "tableSlots": {
      "maxSlotsPerTableSize": 2,
      "minPeople": 1,
      "maxPeople": 8
    }
  }
}
```

### 2. Availability Check Function

```typescript
/**
 * Check table availability for specific date, time, and party size
 */
export const checkTableAvailability = async (
  date: Date,
  time: Date,
  peopleCount: number
): Promise<AvailabilityCheck> => {
  try {
    // Format date and time
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`; // HH:MM
    const tableKey = `${peopleCount}-person`;

    // Query Firebase
    const ref = database().ref(
      `reservations/${dateString}/${timeString}/${tableKey}`
    );
    
    const snapshot = await ref.once('value');
    const slots = snapshot.val() || {};

    // Count booked slots
    const bookedSlots = Object.values(slots).filter(slot => slot !== null).length;
    const remainingSlots = 2 - bookedSlots;

    return {
      available: remainingSlots > 0,
      remainingSlots,
      totalSlots: 2,
      bookedSlots,
    };
  } catch (error) {
    console.error('Error checking availability:', error);
    throw new Error('Failed to check availability');
  }
};
```

### 3. Reserve Slot Function

```typescript
/**
 * Reserve a table slot
 */
export const reserveTableSlot = async (
  date: Date,
  time: Date,
  peopleCount: number,
  userId: string,
  guestName: string
): Promise<{ success: boolean; confirmationNumber: string }> => {
  try {
    // Format keys
    const dateString = date.toISOString().split('T')[0];
    const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    const tableKey = `${peopleCount}-person`;

    // Check availability first
    const availability = await checkTableAvailability(date, time, peopleCount);
    
    if (!availability.available) {
      throw new Error('No available slots');
    }

    // Get reference
    const ref = database().ref(
      `reservations/${dateString}/${timeString}/${tableKey}`
    );
    
    const snapshot = await ref.once('value');
    const slots = snapshot.val() || {};

    // Find available slot
    const slotNumber = slots.slot1 === null || slots.slot1 === undefined 
      ? 'slot1' 
      : 'slot2';

    // Generate confirmation number
    const confirmationNumber = generateConfirmationNumber();

    // Reserve the slot
    const reservation: Reservation = {
      slotNumber,
      userId,
      guestName,
      confirmedAt: new Date().toISOString(),
      confirmationNumber,
      status: 'confirmed',
      date: dateString,
      time: timeString,
      peopleCount,
    };

    await ref.child(slotNumber).set(reservation);

    return {
      success: true,
      confirmationNumber,
    };
  } catch (error) {
    console.error('Error reserving slot:', error);
    throw error;
  }
};

/**
 * Generate unique confirmation number
 */
const generateConfirmationNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `RES-${year}${month}-${random}`;
};
```

## 💬 User Information Display

### Availability States

#### ✅ State 1: Fully Available (2 slots)

```typescript
<View style={styles.availabilityBanner}>
  <Text style={styles.availableText}>
    ✅ Great choice! 2 slots available for {peopleCount}-person table
  </Text>
</View>
```

Visual: Green background, checkmark icon

#### ⚠️ State 2: Limited Availability (1 slot)

```typescript
<View style={[styles.availabilityBanner, styles.limitedAvailability]}>
  <Text style={styles.warningText}>
    ⚠️ Almost full! Only 1 slot remaining
  </Text>
  <Text style={styles.subText}>
    Book now before it's gone!
  </Text>
</View>
```

Visual: Yellow/Orange background, warning icon

#### ❌ State 3: Fully Booked (0 slots)

```typescript
<View style={[styles.availabilityBanner, styles.fullyBooked]}>
  <Text style={styles.errorText}>
    ❌ Sorry, fully booked!
  </Text>
  <Text style={styles.subText}>
    All {peopleCount}-person tables are reserved for {formatDate(date)} at {formatTime(time)}
  </Text>
  <View style={styles.suggestions}>
    <Text style={styles.suggestionsTitle}>Suggestions:</Text>
    <Text>• Try a different time slot</Text>
    <Text>• Choose a different date</Text>
    <Text>• Select a different table size</Text>
  </View>
</View>
```

Visual: Red background, X icon, suggestion buttons

## 🎨 UI/UX Implementation

### In ReserveScreen - PeopleCounter Component

```typescript
import React, { useEffect, useState } from 'react';
import { checkTableAvailability } from '@services/reservationService';

const PeopleCounter: React.FC<PeopleCounterProps> = ({
  count,
  selectedDate,
  selectedTime,
  // ... other props
}) => {
  const [availability, setAvailability] = useState<AvailabilityCheck | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAvailability = async () => {
      if (count === 0) {
        setAvailability(null);
        return;
      }

      setLoading(true);
      try {
        const result = await checkTableAvailability(
          selectedDate,
          selectedTime,
          count
        );
        setAvailability(result);
      } catch (error) {
        console.error('Error checking availability:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAvailability();
  }, [selectedDate, selectedTime, count]);

  return (
    <View style={styles.container}>
      {/* Existing counter UI */}
      
      {/* Availability Indicator */}
      {loading && <ActivityIndicator />}
      
      {availability && (
        <View style={[
          styles.availabilityBadge,
          availability.remainingSlots === 0 && styles.fullyBooked,
          availability.remainingSlots === 1 && styles.limitedAvailability,
        ]}>
          <AppText style={styles.availabilityText}>
            {availability.remainingSlots === 0 
              ? '❌ Fully Booked - Try different time'
              : availability.remainingSlots === 1
              ? '⚠️ Only 1 slot left!'
              : '✅ Available'}
          </AppText>
        </View>
      )}
    </View>
  );
};
```

### In ConfirmationScreen - Final Check

```typescript
const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  guests,
  date,
  time,
  onConfirm,
}) => {
  const [reserving, setReserving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setReserving(true);
    setError(null);

    try {
      // Double-check availability before confirming
      const availability = await checkTableAvailability(date, time, guests);

      if (!availability.available) {
        Alert.alert(
          'Sorry!',
          'This table was just booked by another guest. Please try a different time or date.',
          [
            { text: 'Go Back', onPress: () => navigation.goBack() },
            { text: 'Try Another Time', style: 'cancel' },
          ]
        );
        return;
      }

      // Reserve the slot
      const result = await reserveTableSlot(
        date,
        time,
        guests,
        currentUser.uid,
        currentUser.displayName
      );

      if (result.success) {
        // Show success
        Alert.alert(
          'Reservation Confirmed! 🎉',
          `Your confirmation number is: ${result.confirmationNumber}`,
          [{ text: 'OK', onPress: () => onConfirm() }]
        );
      }
    } catch (error) {
      setError('Failed to confirm reservation. Please try again.');
      console.error('Reservation error:', error);
    } finally {
      setReserving(false);
    }
  };

  return (
    <SafeAreaView>
      {/* Existing confirmation UI */}
      
      <Button
        title={reserving ? 'Confirming...' : 'Confirm Reservation'}
        onPress={handleConfirm}
        disabled={reserving}
      />

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </SafeAreaView>
  );
};
```

## 🚀 Advanced Features

### 1. Temporary Slot Hold (5-minute timer)

```typescript
/**
 * Hold a slot temporarily for 5 minutes while user confirms
 */
export const holdSlotTemporarily = async (
  date: Date,
  time: Date,
  peopleCount: number,
  userId: string
): Promise<string> => {
  const holdId = `HOLD-${Date.now()}`;
  const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes

  // Save temporary hold
  await database().ref(`temporaryHolds/${holdId}`).set({
    date: date.toISOString(),
    time: time.toISOString(),
    peopleCount,
    userId,
    expiresAt,
    status: 'holding',
  });

  // Auto-release after 5 minutes
  setTimeout(async () => {
    await releaseTemporaryHold(holdId);
  }, 5 * 60 * 1000);

  return holdId;
};

export const releaseTemporaryHold = async (holdId: string): Promise<void> => {
  await database().ref(`temporaryHolds/${holdId}`).remove();
};
```

### 2. Waitlist System

```typescript
interface WaitlistEntry {
  userId: string;
  date: string;
  time: string;
  peopleCount: number;
  addedAt: string;
  notified: boolean;
}

export const joinWaitlist = async (
  date: Date,
  time: Date,
  peopleCount: number,
  userId: string
): Promise<void> => {
  const waitlistRef = database().ref('waitlist');
  
  await waitlistRef.push({
    userId,
    date: date.toISOString().split('T')[0],
    time: `${time.getHours()}:${time.getMinutes()}`,
    peopleCount,
    addedAt: new Date().toISOString(),
    notified: false,
  });
};

// When a reservation is cancelled, notify waitlist
export const notifyWaitlist = async (
  date: string,
  time: string,
  peopleCount: number
): Promise<void> => {
  const waitlistRef = database().ref('waitlist');
  
  const snapshot = await waitlistRef
    .orderByChild('addedAt')
    .once('value');

  const entries: WaitlistEntry[] = [];
  snapshot.forEach((child) => {
    const entry = child.val();
    if (
      entry.date === date &&
      entry.time === time &&
      entry.peopleCount === peopleCount &&
      !entry.notified
    ) {
      entries.push({ ...entry, key: child.key });
    }
  });

  // Notify first person in waitlist
  if (entries.length > 0) {
    const firstEntry = entries[0];
    // Send push notification
    await sendPushNotification(firstEntry.userId, {
      title: 'Table Available!',
      body: `A ${peopleCount}-person table is now available for ${date} at ${time}`,
    });
    
    // Mark as notified
    await waitlistRef.child(firstEntry.key).update({ notified: true });
  }
};
```

### 3. Admin Dashboard Queries

```typescript
/**
 * Get all reservations for a specific date
 */
export const getReservationsByDate = async (
  date: Date
): Promise<Reservation[]> => {
  const dateString = date.toISOString().split('T')[0];
  const ref = database().ref(`reservations/${dateString}`);
  
  const snapshot = await ref.once('value');
  const reservations: Reservation[] = [];
  
  snapshot.forEach((timeSlot) => {
    timeSlot.forEach((tableSize) => {
      tableSize.forEach((slot) => {
        if (slot.val()) {
          reservations.push(slot.val());
        }
      });
    });
  });
  
  return reservations;
};

/**
 * Get slot utilization statistics
 */
export const getSlotUtilization = async (
  date: Date
): Promise<{
  totalSlots: number;
  bookedSlots: number;
  availableSlots: number;
  utilizationRate: number;
}> => {
  const reservations = await getReservationsByDate(date);
  const totalSlots = 8 * 2; // 8 table sizes × 2 slots each = 16 total slots per time
  const bookedSlots = reservations.length;
  const availableSlots = totalSlots - bookedSlots;
  const utilizationRate = (bookedSlots / totalSlots) * 100;

  return {
    totalSlots,
    bookedSlots,
    availableSlots,
    utilizationRate,
  };
};
```

## 📊 Analytics & Reporting

### Popular Time Slots

```typescript
export const getPopularTimeSlots = async (
  startDate: Date,
  endDate: Date
): Promise<Array<{ time: string; bookings: number }>> => {
  // Query reservations between dates
  // Aggregate by time slot
  // Return sorted by popularity
};
```

### Popular Table Sizes

```typescript
export const getPopularTableSizes = async (
  startDate: Date,
  endDate: Date
): Promise<Array<{ tableSize: number; bookings: number }>> => {
  // Query reservations between dates
  // Aggregate by table size
  // Return sorted by popularity
};
```

## 🔐 Security Rules (Firebase)

```json
{
  "rules": {
    "reservations": {
      ".read": "auth != null",
      "$date": {
        "$time": {
          "$tableSize": {
            "$slotNumber": {
              ".write": "auth != null && (!data.exists() || data.child('userId').val() === auth.uid)",
              ".validate": "newData.hasChildren(['userId', 'confirmedAt', 'confirmationNumber', 'status'])"
            }
          }
        }
      }
    },
    "waitlist": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## ✅ Implementation Checklist

- [ ] Setup Firebase Realtime Database
- [ ] Implement `checkTableAvailability` function
- [ ] Implement `reserveTableSlot` function
- [ ] Add availability indicator in PeopleCounter
- [ ] Add final check in ConfirmationScreen
- [ ] Implement temporary slot hold system
- [ ] Add waitlist functionality
- [ ] Create admin dashboard
- [ ] Add push notifications for waitlist
- [ ] Implement analytics and reporting
- [ ] Add Firebase security rules
- [ ] Test edge cases (concurrent bookings, race conditions)
- [ ] Add error handling and user feedback
- [ ] Performance optimization (caching, indexing)

## 🎯 Success Metrics

- Prevent double-booking (0% error rate)
- Fast availability checks (< 500ms)
- User satisfaction with booking process (> 90%)
- Slot utilization rate tracking
- Waitlist conversion rate

---

**Status**: Planning Phase
**Next Steps**: Implement Firebase backend and availability checking system
**Priority**: High - Core feature for reservation system
