document.getElementById('ageForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const dobInput = document.getElementById('dob').value;
    const birthDate = new Date(dobInput);
    const today = new Date();
  
    if (birthDate > today) {
      alert('La fecha de nacimiento no puede ser futura.');
      return;
    }
  
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
  
    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0); // último día del mes anterior
      days += previousMonth.getDate();
    }
  
    if (months < 0) {
      years--;
      months += 12;
    }
  
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
  });
  