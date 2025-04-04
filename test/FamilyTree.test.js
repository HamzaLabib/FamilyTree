import { expect } from 'chai';
import FamilyTree from '../FamilyTree.js';

describe('FamilyTree Tests', () => {
  let familyTree;

  // Reset the test (I googled it and used ChatGPT to fix the retrieving error but I am not fully understand it)
  beforeEach(() => {
    familyTree = new FamilyTree();
  });

  it('should add a new member', () => {
    const member = familyTree.addMember('Adam Labib', '1980-01-17', { gender: 'Male' });
    expect(member).to.have.property('name', 'Adam Labib');
    expect(member).to.have.property('birthdate', '1980-01-17');
    expect(member.details).to.have.property('gender', 'Male');
  });

  it('should not duplicate members', () => {
    const member = familyTree.addMember('Adam Labib', '1980-01-17');
    const duplicatedMember = familyTree.addMember('Adam Labib', '1980-01-17');
    expect(duplicatedMember).to.equal(member);
  });

  it('should set spouse relationship', () => {
    familyTree.addMember('Adam Labib', '1980-01-17');
    familyTree.addMember('Sara Alaedin', '1982-03-17');
    familyTree.setSpouse('Adam Labib', 'Sara Alaedin');

    expect(familyTree.members['Adam Labib'].spouse).to.have.property('name', 'Sara Alaedin');
    expect(familyTree.members['Sara Alaedin'].spouse).to.have.property('name', 'Adam Labib');
  });

  it('should add parent-child relationships', () => {
    familyTree.addMember('Adam Labib', '1980-01-17');
    familyTree.addMember('Sara Alaedin', '1982-03-17');
    familyTree.addMember('Mussa Labib', '2005-06-17');

    familyTree.addParentChildRelationship('Adam Labib', 'Mussa Labib');
    familyTree.addParentChildRelationship('Sara Alaedin', 'Mussa Labib');

    const mussa = familyTree.members['Mussa Labib'];
    expect(mussa.parents).to.have.lengthOf(2);
    expect(familyTree.members['Adam Labib'].children).to.include(mussa);
    expect(familyTree.members['Sara Alaedin'].children).to.include(mussa);
  });

  it('should update the member details', () => {
    familyTree.addMember('Adam Labib', '1980-01-17', { gender: 'Male' });
    familyTree.updateMember('Adam Labib', {
      birthdate: '1980-02-17',
      details: { occupation: 'Engineer' }
    });

    const adam = familyTree.members['Adam Labib'];
    expect(adam.birthdate).to.equal('1980-02-17');
    expect(adam.details).to.have.property('occupation', 'Engineer');
    expect(adam.details).to.have.property('gender', 'Male');
  });

  it('should retrieve all descendants', () => {
    familyTree.addMember('Adam Labib', '1980-01-17');
    familyTree.addMember('Mussa Labib', '2005-06-17');
    familyTree.addMember('Kiara Labib', '2008-09-17');
    familyTree.addMember('Mariam Mussa', '2030-05-17');

    familyTree.addParentChildRelationship('Adam Labib', 'Mussa Labib');
    familyTree.addParentChildRelationship('Adam Labib', 'Kiara Labib');
    familyTree.addParentChildRelationship('Mussa Labib', 'Mariam Mussa');

    const descendants = familyTree.getDescendants('Adam Labib');
    expect(descendants).to.have.lengthOf(3);

    const descendantNames = descendants.map(member => member.name);
    expect(descendantNames).to.include.members(['Mussa Labib', 'Kiara Labib', 'Mariam Mussa']);
  });
});
