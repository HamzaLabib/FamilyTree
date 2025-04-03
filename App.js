import FamilyTree from './FamilyTree.js';

const familyTree = new FamilyTree();
 
//Add family members
familyTree.addMember('Adam Labib', '1985-09-17', { gender: 'Male' });
familyTree.addMember('Sara Alaedin', '1989-03-17', { gender: 'Female' });
familyTree.addMember('Mussa Labib', '2009-06-17', { status: 'Single' });
familyTree.addMember('Kiara Labib', '2015-12-17');
familyTree.addMember('Mariam Ali', '2023-09-17');
  
//Spouse
familyTree.setSpouse('Adam Labib', 'Sara Alaedin');
  
//Children
familyTree.addParentChildRelationship('Adam Labib', 'Mussa Labib');
familyTree.addParentChildRelationship('Sara Alaedin', 'Mussa Labib');
familyTree.addParentChildRelationship('Adam Labib', 'Kiara Labib');
familyTree.addParentChildRelationship('Sara Alaedin', 'Kiara Labib');
  
//Grandchildren
familyTree.addParentChildRelationship('Mussa Labib', 'Mariam Ali');
  
//Traverse the tree and display "Adam Labib" family
familyTree.displayDescendants('Adam Labib');

// Update Mussa's info
familyTree.updateMember('Mussa Labib', {
    details: { 
        status: 'Married', // Update a detail
        occupation: 'Programer' // Add a new detail
    } 
});

console.log('\n---------------');
familyTree.displayDescendants('Adam Labib');
