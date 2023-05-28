class TableCsv {
    /**
     * @param {HTMLTableElement} root The table element which will display the CSV data.
     */
    constructor(root) {
      this.root = root;
    }
  
    /**
     * Clears existing data in the table and replaces it with new data.
     *
     * @param {string[][]} data A 2D array of data to be used as the table body
     * @param {string[]} headerColumns List of headings to be used
     */
    update(data, headerColumns = []) {
      this.clear();
      this.setHeader(headerColumns);
      this.setBody(data);
    }
  
    /**
     * Clears all contents of the table (incl. the header).
     */
    clear() {
      this.root.innerHTML = "";
    }
  
    /**
     * Sets the table header.
     *
     * @param {string[]} headerColumns List of headings to be used
     */
    setHeader(headerColumns) {
      this.root.insertAdjacentHTML(
        "afterbegin",
        `
              <thead>
                  <tr>
                      ${headerColumns.map((text) => `<th>${text}</th>`).join("")}
                      ${headerColumns.map((text) => `<th>Valid</th>`).join("")}
                  </tr>
                  
              </thead>
          `
      );
    }
  
    /**
     * Sets the table body.
     *
     * @param {string[][]} data A 2D array of data to be used as the table body
     */
    setBody(data) {
        const rowsHtml = data.map((row) => {    
            return `
                <tr>
                     ${row.map((text) => `<td>${text}</td>`).join("")}
                     <td>True</td>
                     
                </tr>
            `;
      });
  
      this.root.insertAdjacentHTML(
        "afterbegin",
        `
              <tbody>
                  ${rowsHtml.join("")}
              </tbody>
          `
      );
    }

    

  }

  
  const tableRoot = document.querySelector("#csvRoot");
  const csvFileInput = document.querySelector("#csvFileInput");
  const tableCsv = new TableCsv(tableRoot);


  
  csvFileInput.addEventListener("change", (e) => {
    Papa.parse(csvFileInput.files[0], {
      delimiter: ",",
      skipEmptyLines: true,
      complete: (results) => {
        tableCsv.update(results.data.slice(1), results.data[0]);
        let i=1;
        var mytab = document.getElementById('csvRoot');
        var totalRowCount = mytab.rows.length;
        console.log(totalRowCount);        
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        while(i<totalRowCount) 
        {
            let check = mytab.rows[i].cells[0].innerHTML;
            if(validRegex.test(check))
            {
                mytab.rows[i].cells[1].innerHTML = 'Yes';
                

            }
            else
            {
                
                mytab.rows[i].cells[1].innerHTML = 'No'
            }
            
            i++;
            
            
        }
      }
    });
  });



  