const GOLD = 'Gold',
SILVER = 'Silver',
BRONZE = 'Bronze';
class MembershipType {
    static get GOLD_MEMBERSHIP() {
        return GOLD;
      }
  
    static get SILVER_MEMBERSHIP() {
        return SILVER;
      }

    static get BRONZE_MEMBERSHIP() {
      return BRONZE;
    }
}

module.exports  = {
    MembershipType
}