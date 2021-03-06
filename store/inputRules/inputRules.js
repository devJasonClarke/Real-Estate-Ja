export const state = () => ({
  phoneNumberRules: [
    v => !!v || "Phone number is required.",
    value => (value || "").toString().length >= 10 || "10 Digit Dialing",
    value => (value || "").toString().length < 11 || "10 Digit Dialing",
    value =>
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
        value
      ) || "Phone number must be valid"
  ],
  whatsappNumberRules: [
    value => (value || "").toString().length >= 10 || "Min 10 Digits",
    value => (value || "").toString().length < 15 || "Max 15 digits",
    value =>
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/i.test(
        value
      ) || "Phone number must be valid"
  ],
  nameRules: [
    v => !!v || "Name is required",
    v => v.length > 1 || "Name must be greater than 1 character",
    v => (v && !!v.trim()) || "Value cannot be blank"
  ],
  idRules: [
    v => !!v || "ID is required",
    v => v.length == 11 || "Id should equal 11 characters",
    value => !/[ ]/.test(value) || "no spaces allowed"
  ],
  passwordRules: [
    value => !!value || "Required.",
    value => (value && !!value.trim()) || "Value cannot be blank",
    value => (value || "").length >= 8 || "Min 8 characters"
  ],
  emailRules: [
    value => !!value || "Required.",
    value => !/[ ]/.test(value) || "no spaces allowed",
    value => (value || "").length <= 100 || "Max 100 characters",
    value =>
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        value
      ) || "E-mail must be valid"
  ],
  amountRulesMinOne: [
    value => !!value || "Required.",
    value => !/[ ]/.test(value) || "no spaces allowed",
    value => /^(?!00)\d/.test(value) || "valid amount required",
    value =>
      (value || "").toString().length <= 15 ||
      "Max 15 digits. 16 digits are a Quadrillion, Please contact our team.",
    value => value >= 1 || "valid amount required"
  ],
  amountRules: [
    value => !!value || "Required.",
    value => !/[ ]/.test(value) || "no spaces allowed",
    value => /^(?!00)\d/.test(value) || "valid amount required",
    value =>
      (value || "").toString().length <= 15 ||
      "Max 15 digits. 16 digits are a Quadrillion, Please contact our team.",
    value => value >= 0 || "No negative amounts"
  ],
  messageRules: [
    v => !!v || "Message is required",
    v => (v && !!v.trim()) || "Value cannot be blank",
    v => v.length >= 10 || "Message must be atleast 10 characters long"
  ],
  descriptionRules: [
    v => !!v || "Description is required",
    v => (v && !!v.trim()) || "Value cannot be blank",
    v => v.length >= 10 || "Description must be atleast 10 characters long",
    value => (value || "").length <= 500 || "Max 500 characters"
  ],
  websiteRules: [
    value => !/[ ]/.test(value) || "no spaces allowed",
    value => (value || "").length <= 100 || "Max 100 characters",
   ],
  youtubeRules: [
    value => !/[ ]/.test(value) || "no spaces allowed",
    value =>
      /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/i.test(value) ||
      "Valid Youtube URL required"
  ],
  matterportRules: [
    value => !/[ ]/.test(value) || "no spaces allowed",
    value =>
    /https?:\/\/my\.matterport\.com\/show\/\??(m=(?<code>[\w\d]+))/i.test(value) ||
      "Valid virtual tour URL required. Contact us for more details."
  ],
});

export const getters = {
  phoneNumberRules: state => state.phoneNumberRules,
  whatsappNumberRules: state => state.whatsappNumberRules,
  nameRules: state => state.nameRules,
  passwordRules: state => state.passwordRules,
  emailRules: state => state.emailRules,
  amountRules: state => state.amountRules,
  amountRulesMinOne: state => state.amountRulesMinOne,
  messageRules: state => state.messageRules,
  descriptionRules: state => state.descriptionRules,
  idRules: state => state.idRules,
  websiteRules: state => state.websiteRules,
  youtubeRules: state => state.youtubeRules,
  matterportRules: state => state.matterportRules,
  
};

//validate-on-blur put that in the input tag to run rules on input