const CAR_ONLY = 'Car Only',
CAR_AND_DRIVER = 'Car & Driver';

module.exports  = class BookingType {
  static get CAR_ONLY() {
      return CAR_ONLY;
    }
  
  static get CAR_AND_DRIVER() {
      return CAR_AND_DRIVER;
    }
}