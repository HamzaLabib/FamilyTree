import FamilyMember from './FamilyMember.js';

export default class FamilyTree {
    constructor() {
      this.members = {};
    }
  
    addMember(name, birthdate, details = {}) {
      if (this.members[name]) {
        console.warn(`Member "${name}" already exists.`);
        return this.members[name];
      }
      const newMember = new FamilyMember(name, birthdate, details);
      this.members[name] = newMember;
      return newMember;
    }
  
    setSpouse(memberName, spouseName) {
      const member = this.members[memberName];
      const spouse = this.members[spouseName];
      if (!member || !spouse) {
        console.error('One or both members not found.');
        return;
      }
      member.spouse = spouse;
      spouse.spouse = member;
    }
  
    addParentChildRelationship(parentName, childName) {
      const parent = this.members[parentName];
      const child = this.members[childName];
      if (!parent || !child) {
        console.error('Parent or child not found.');
        return;
      }

      parent.children.push(child);

      if (!child.parents.includes(parent)) {
        child.parents.push(parent);
      }
    }
  
    updateMember(name, updatedDetails = {}) {
      const member = this.members[name];
      if (!member) {
        console.error('Member not found.');
        return;
      }
      
      // Update the name or birthdate if provided
      if (updatedDetails.name) member.name = updatedDetails.name;
      if (updatedDetails.birthdate) member.birthdate = updatedDetails.birthdate;
      
      // Merge any additional details with existing ones
      member.details = { ...member.details, ...updatedDetails.details };
    }
  
    // Get all descendants of a given member
    getDescendants(name) {
      const member = this.members[name];
      if (!member) {
        console.error('Member not found.');
        return [];
      }
      const descendants = [];

      // Helper function (depth-first search)
      function traverse(person) {
        for (let child of person.children) {
          descendants.push(child);
          traverse(child);
        }
      }
      traverse(member);
      return descendants;
    }
  
    // Display the family
    displayDescendants(name) {
      const member = this.members[name];
      if (!member) {
        console.error('Member not found.');
        return;
      }

      console.log(member.name + ' family')
      console.log(member.toString());
      console.log(member.spouse.toString());

      function traverse(person, level) {
        for (let child of person.children) {
          console.log(' '.repeat(level * 2) + child.toString());
          traverse(child, level + 1);
        }
      }
      traverse(member, 1);
    }
}