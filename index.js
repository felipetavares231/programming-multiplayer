
const difficulty = "EASY";
const apiUrl = "https://alfa-leetcode-api.onrender.com";

async function getProblemsList() {
  let res = await fetch(`${apiUrl}/problems?difficulty=${difficulty}`)
  console.log(await res.json());
}

async function getSelectedProblem() {
  let res = await fetch(`${apiUrl}/select?titleSlug=${"two-sum"}`)
  console.log(await res.json());
}

async function getOfficialSolution() {
  let res = await fetch(`${apiUrl}/officialSolution?titleSlug=${"two-sum"}`)
  console.log(await res.json());
}

