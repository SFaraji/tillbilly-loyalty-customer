export const validationDictionary = {
  bool: {
    presence: {
      allowEmpty: false,
      message: "This is required"
    }
  },

  email: {
    presence: {
      allowEmpty: false,
      message: "Email is required"
    },
    email: {
      message: "Email address must be valid"
    }
  },

  generic: {
    presence: {
      allowEmpty: false,
      message: "This is required"
    }
  },

  integer: {
    presence: {
      allowEmpty: false,
      message: "This is required"
    },
    numericality: {
      greaterThan: 0,
      onlyInteger: true,
      message: "Must be valid"
    }
  },

  password: {
    presence: {
      allowEmpty: false,
      message: "This is required"
    },
    length: {
      minimum: 5,
      message: "Password must be at least 5 characters long"
    }
  },

  name: {
    length: {
      maximum: 75,
      message: "Must be less than 75 characters long"
    }
  },

  displayName: {
    presence: {
      allowEmpty: false,
      message: "Display name is required"
    },
    length: {
      maximum: 75,
      message: "Must be less than 75 characters long"
    }
  },

  phone: {
    presence: {
      allowEmpty: false,
      message: "This is required"
    },
    format: {
      pattern: /^[2-9]\d{2}-\d{3}-\d{4}$/,
      message: "Phone number must be valid"
    }
  },

  zip: {
    presence: {
      allowEmpty: false,
      message: "This is required"
    },
    length: {
      is: 5,
      message: "Zip must be 5 digits long"
    }
  }
};
