// Central asset exports: fonts, icons, images
// Fonts: use only required weights to reduce bundle.

export const Fonts = {
  regular: 'OpenSans-Regular',
  medium: 'OpenSans-Medium',
  semiBold: 'OpenSans-SemiBold',
  serifTitle: 'NotoSerif-Bold',
};

// Icons: active vs inactive mapping. Keep consistent names.
export const CategoryIcons = {
  salad: {
    active: require('./icons/Salad-color@x4.png'),
    inactive: require('./icons/Salad-noColor@x4.png'),
  },
  drink: {
    active: require('./icons/Drink-color@x4.png'),
    inactive: require('./icons/Drink-noColor@x4.png'),
  },
  pizza: {
    active: require('./icons/Pizza-color@x4.png'),
    inactive: require('./icons/Pizza-noColor@x4.png'),
  },
  burger: {
    active: require('./icons/Burger-color@x4.png'),
    inactive: require('./icons/Burger-noColor@x4.png'),
  },
  dessert: {
    active: require('./icons/Dessert-color@x4.png'),
    inactive: require('./icons/Dessert-noColor@x4.png'),
  },
  pasta: {
    active: require('./icons/Pasta-color4x.png'),
    inactive: require('./icons/Pasta-noColor4x.png'),
  },
};

export const Images = {
  logo: require('./images/logo-restaurant.png'),
};

// Menu Images - Organized by category for easy access
export const MenuImages = {
  salad: {
    salad1: require('./images/menu/Salad-1.png'),
    salad2: require('./images/menu/Salad-2.png'),
    salad3: require('./images/menu/Salad-3.png'),
    salad4: require('./images/menu/Salad-4.png'),
    salad5: require('./images/menu/Salad-5.png'),
  },
  pasta: {
    pasta1: require('./images/menu/Pasta-1.png'),
    pasta2: require('./images/menu/Pasta-2.png'),
    pasta3: require('./images/menu/Pasta-3.png'),
    pasta4: require('./images/menu/Pasta-4.png'),
    pasta5: require('./images/menu/Pasta-5.png'),
    pasta6: require('./images/menu/Pasta-6.png'),
  },
  pizza: {
    pizza1: require('./images/menu/Pizza-1.png'),
    pizza2: require('./images/menu/Pizza-2.png'),
    pizza3: require('./images/menu/Pizza-3.png'),
    pizza4: require('./images/menu/Pizza-4.png'),
  },
  burger: {
    burger1: require('./images/menu/Burgers-1.png'),
    burger2: require('./images/menu/Burgers-2.png'),
    burger3: require('./images/menu/Burgers-3.png'),
    burger4: require('./images/menu/Burgers-4.png'),
  },
  drink: {
    drink1: require('./images/menu/Drink-1.png'),
    drink2: require('./images/menu/Drink-2.png'),
    drink3: require('./images/menu/Drink-3.png'),
    drink4: require('./images/menu/Drink-4.png'),
    drink5: require('./images/menu/Drink-5.png'),
  },
  dessert: {
    dessert1: require('./images/menu/Dessert-1.png'),
    dessert2: require('./images/menu/Dessert-2.png'),
    dessert3: require('./images/menu/Dessert-3.png'),
    dessert4: require('./images/menu/Dessert-4.png'),
    dessert5: require('./images/menu/Dessert-5.png'),
    dessert6: require('./images/menu/Dessert-6.png'),
  },
};

export const SearchIcons = {
  search: require('./icons/Search-noColor@x4.png'),
  mic: require('./icons/Mic-noColor@x4.png'),
};

export const RatingIcons = {
  star: require('./icons/Stars4x.png'),
};

// Bottom Navigation Icons
export const NavBarIcons = {
  home: {
    active: require('./icons/Home-color4x.png'),
    inactive: require('./icons/Home-noColor4x.png'),
  },
  hotDeal: {
    active: require('./icons/Hotdeal-color4x.png'),
    inactive: require('./icons/Hotdeal-noColor4x.png'),
  },
  scan: require('./icons/Scan4x.png'),
  rewards: {
    active: require('./icons/Rewards-color4x.png'),
    inactive: require('./icons/Rewards-noColor4x.png'),
  },
  reserve: {
    active: require('./icons/Reserve-color4x.png'),
    inactive: require('./icons/Reserve-noColor4x.png'),
  },
};

export type CategoryKey = keyof typeof CategoryIcons;
