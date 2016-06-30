
module.exports = {
  calGrade: function (score) {
   if (typeof score != 'number'|| Number.isNaN(score)||score>100||score<0) {return;}
  
  if(score>=80)grade = 'A';
  else if(score>=70)grade='B';
  else if(score>=60)grade='C';
  else if(score>=50)grade='D';
  else grade='F';

return grade;
  }
};

