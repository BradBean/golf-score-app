window.onload = function() {
    // Define the number of rows and columns for the table
    let numRows = 4;
    let numCols = 10;
  
    // Create an array of header column names
    let headerColumns = ["Topic"];
    for (let i = 1; i < numCols; i++) {
      headerColumns.push("Column " + i);
    }
  
    // Create a new table element
    let table = document.createElement("table");
    table.style.borderRadius = "0px";
    table.style.fontSize = "12px"; // set font size for the table
    table.style.cellPadding = "5px"; // set cell padding for the table
  
    // Create a new row element for the header row
    let headerRow = document.createElement("tr");
    headerRow.style.backgroundColor = "#007bff";
  
    // Loop through the header column names and create the header cells
    for (let i = 0; i < headerColumns.length; i++) {
      let headerCell = document.createElement("th");
      headerCell.textContent = headerColumns[i];
      headerCell.style.color = "#fff";
      if (i === 0) {
        headerCell.style.width = "100px"; // set width for "Topic" cell
      }
      headerRow.appendChild(headerCell);
    }
  
  
    // Add the header row to the table
    table.appendChild(headerRow);
  
    // Create an array of table data objects
    let tableData = [];
    for (let i = 0; i < numRows; i++) {
      let rowData = { topic: "Topic " + (i + 1) };
      for (let j = 1; j < numCols; j++) {
        rowData["column" + j] = "T " + (i + 1) + " C " + j;
      }
      tableData.push(rowData);
    }
  
    // Loop through the table data and create the rows and cells
    for (let i = 0; i < tableData.length; i++) {
      let rowData = tableData[i];
      let row = document.createElement("tr");
  
      // Loop through the keys in the row data and create the cells
      for (let key in rowData) {
        let cell = document.createElement("td");
        cell.textContent = rowData[key];
        cell.style.height = "20px"; // set height for each cell
        row.appendChild(cell);
      }
  
      // Add the row to the table
      table.appendChild(row);
    }
  
    // Add the table to the document
    document.body.appendChild(table);
  }