
  const form = document.getElementById('registrationForm');
  const table = document.getElementById('formDataTable');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    const formData = new FormData(form);
    const formEntries = Array.from(formData.entries());

    const userData = {};
    formEntries.forEach(entry => {
      const [key, value] = entry;
      userData[key] = value;
    });

    let savedData = JSON.parse(localStorage.getItem('userEntries')) || [];
    savedData.push(userData);
    localStorage.setItem('userEntries', JSON.stringify(savedData));

    displayTable();
    form.reset();
  });

  function displayTable() {
    table.innerHTML = '';

    const savedData = JSON.parse(localStorage.getItem('userEntries')) || [];
    if (savedData.length === 0) return;

    const tableHeaders = Object.keys(savedData[0]);
    const tableBody = document.createElement('tbody');

    savedData.forEach(data => {
      const bodyRow = document.createElement('tr');

      tableHeaders.forEach(header => {
        const td = document.createElement('td');
        td.textContent = data[header];
        bodyRow.appendChild(td);
      });

      tableBody.appendChild(bodyRow);
    });

    const tableHead = table.createTHead();
    const headRow = tableHead.insertRow();

    tableHeaders.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headRow.appendChild(th);
    });

    table.appendChild(tableBody);
  }

  displayTable();