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
    active: require('./icons/Pasta-color@x4.png'),
    inactive: require('./icons/Pasta-noColor@x4.png'),
  },
};

export const Images = {
  logo: require('./images/logo-restaurant.png'),
};

export const SearchIcons = {
  search: require('./icons/Search-noColor@x4.png'),
  mic: require('./icons/Mic-noColor@x4.png'),
};

export type CategoryKey = keyof typeof CategoryIcons;
