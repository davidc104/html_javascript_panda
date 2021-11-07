var select_tag = d3.select("#selDataset");

select_tag
  .append("option")
  .property("value", "")
  .text("Select School Name");

const tbody = d3.select("tbody");

d3.csv("汐止區.csv").then((data) => {
  // console.log("data")
  // console.log(data)

  var sname = data.map(x => x.sname);
  // console.log("sname")
  // console.log(sname)

  sname.map((school_name) => {
    select_tag
      .append("option")
      .property("value", school_name)
      .text(school_name);
  });

  data.forEach((school_data) => {
    const row = tbody.append("tr");

    Object.values(school_data).forEach((value) => {
      let cell = row.append("td");
      cell.text(value);
    });
  });
});

function optionChanged(selected_name) {
  console.log("selected_name=", selected_name);

  d3.csv("汐止區.csv").then((data) => {

    data.forEach((school_data) => {

      if (school_data.sname == selected_name) {
        console.log("school_data")
        console.log(school_data)

        tbody.html("")

        const row = tbody.append("tr");

        Object.values(school_data).forEach((value) => {
          let cell = row.append("td");
          cell.text(value);
        });
      }
    });
  });
}

// doughnut chart
var sel_Lan = d3.select('#selLanguage');

sel_Lan
  .append("option")
  .property("value", "")
  .text("Select 族語方言");

var languages = [];

d3.csv("方言通過.csv").then((pie_data) => {
  // console.log("pie_data")
  // console.log(pie_data)

  var language_filter = pie_data.map(x => x.族語方言別);
  // console.log("language_filter");
  // console.log(language_filter);

  language_filter.map((lan) => {

    if (languages.indexOf(lan) === -1) {
      languages.push(lan)

      sel_Lan
        .append("option")
        .property("value", lan)
        .text(lan);
    }

  });
});

function optionLanguage(selected_lan) {
  console.log("selected_lan=", selected_lan);

  d3.csv("方言通過.csv").then((pie_data) => {
    // console.log("pie_data")
    // console.log(pie_data)

    var results = pie_data.filter(x => x.族語方言別 == selected_lan);
    console.log("results")
    console.log(results)

    label_list = [];

    label_list.push("報名人數")
    label_list.push("應試人數")
    label_list.push("通過人數")

    results.forEach((lan_data) => {
      console.log("lan_data")
      console.log(lan_data)

      data_list = [];

      signup = lan_data.報名人數
      attendance = lan_data.應試人數
      pass = lan_data.通過人數

      data_list.push(signup, attendance, pass);

      if (lan_data.級別 == "初級") {
        id = "初級";
        title = selected_lan + " - 初級";
      }
      else if (lan_data.級別 == "中級") {
        id = "中級";
        title = selected_lan + " - 中級"
      }
      else if (lan_data.級別 == "中高級") {
        id = "中高級";
        title = selected_lan + " - 中高級"
      }
      else if (lan_data.級別 == "高級") {
        id = "高級";
        title = selected_lan + " - 高級"
      }
      else {
        id = "優級";
        title = selected_lan + " - 優級"
      }

      //  doughnut  

      new Chart(document.getElementById(id), {
        type: 'doughnut',
        data: {
          labels: label_list,
          datasets: [
            {
              label: "Population (millions)",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: data_list
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: title
          }
        }

      });


    });
  });
}
