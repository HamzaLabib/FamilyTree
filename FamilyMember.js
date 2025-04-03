export default class FamilyMember {
    constructor(name, birthdate, details = {}) {
      this.name = name;
      this.birthdate = birthdate;
      this.details = details;  // Additional info such as gender, occupation.
      this.parents = [];       
      this.children = [];      
      this.spouse = null;      
    }

    toString(){
        return `${this.name}, ${this.birthdate}, ${
            JSON.stringify(this.details)
            }`;
    }
}