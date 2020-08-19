document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
let total = 0;

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = {
    id,
    description,
    severity,
    assignedTo,
    status
  };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  total++
  fetchIssues();
  totalCount();
  e.preventDefault();
}
let closed = 0;
const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);

  if (currentIssue.status == "Closed") {
    alert("Already Closed!")
  } else {
    closed++;
    currentIssue.status = "Closed";
    currentIssue.description = `<s>${currentIssue.description}</s>`;
    document.getElementById("classChange").innerHTML = `<span id="classChange" class="label label-info"> ${status} </span>`;
    closeCount();
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  
}
let remove = 0;
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  remove++;
  removeItem();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {
      id,
      description,
      severity,
      assignedTo,
      status
    } = issues[i];

    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span id="classChange" class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
const totalCount = () => {
  const totalIssues = document.querySelector("#totalIssues");
  const issueOpen = document.querySelector("#issueOpen");
  totalIssues.innerHTML = total;
  issueOpen.innerHTML = total;
  console.log(`"total:" ${total} + "closed:" ${closed} + "remove:" ${remove}`);
}
const closeCount = () => {
  const issueOpen = document.querySelector("#issueOpen");
  issueOpen.innerHTML = total - closed;
  console.log(`"total:" ${total} + "closed:" ${closed} + "remove:" ${remove}`);
}
const removeItem = () => {
  const issueOpen = document.querySelector("#issueOpen");
  if (issueOpen.innerHTML == 0) {
    issueOpen.innerHTML = 0;
  } else {
    issueOpen.innerHTML = total - 1;
  }

  total--;
  const totalIssues = document.querySelector("#totalIssues");
  totalIssues.innerHTML = total;
  console.log(`"total:" ${total} + "closed:" ${closed} + "remove:" ${remove}`);
}