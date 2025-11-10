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
    active: require('./icons/Salad-color.png'),
    inactive: require('./icons/Salad-noColor.png'),
  },
  drink: {
    active: require('./icons/Drink-color.png'),
    inactive: require('./icons/Drink-noColor.png'),
  },
  pizza: {
    active: require('./icons/Pizza-color.png'),
    inactive: require('./icons/Pizza-noColor.png'),
  },
  burger: {
    active: require('./icons/Burger-color.png'),
    inactive: require('./icons/Burger-noColor.png'),
  },
  dessert: {
    active: require('./icons/Dessert-color.png'),
    inactive: require('./icons/Dessert-noColor.png'),
  },
  pasta: {
    active: require('./icons/Pasta-color.png'),
    inactive: require('./icons/Pasta-noColor.png'),
  },
};

export const Images = {
  logo: require('./images/logo-restaurant.png'),
};

export type CategoryKey = keyof typeof CategoryIcons;
