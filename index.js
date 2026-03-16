
const difficulty = "EASY";
//const apiUrl = "https://alfa-leetcode-api.onrender.com";
const apiUrl = "http://localhost:3000"

async function getProblemsList() {
  let res = await fetch(`${apiUrl}/problems?difficulty=${difficulty}`)
  console.log(await res.json());
}

async function getSelectedProblem(titleSlug) {
  let res = await fetch(`${apiUrl}/select?titleSlug=${titleSlug}`);
  const data = await res.json();
  return data;
}

async function getOfficialSolution(titleSlug) {
  let res = await fetch(`${apiUrl}/officialSolution?titleSlug=${titleSlug}`)
  console.log(await res.json());
}

async function verifySolution(question, playerSolution) {
  let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPEN_ROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "stepfun/step-3.5-flash:free",
      "messages": [
        {
          "role": "user",
          content: `
          You are a programming judge.
          Your task is to determine whether the player's solution correctly solves the given problem by comparing it with the official LeetCode solution.
          Inputs:
          - Problem: ${question}
          - Player Solution: ${playerSolution}
          Instructions:
          1. Analyze the problem requirements.
          2. Compare the logic of the player's solution with the official solution.
          3. Determine whether the player's solution correctly solves the problem for all valid inputs.
          4. Consider correctness, edge cases, and algorithmic logic.
          5. The player's solution does NOT need to match the official solution exactly. Different algorithms are acceptable if they produce correct results.
          Output format:

          - Respond ONLY with valid JSON.
          - Do not include markdown, code blocks, or extra text.
          JSON schema:
          {
          "correct": "yes" | "no",
          "explanation": "Brief explanation of why the solution works or fails."
          }`
        }
      ],
    })
  });

  const result = await response.json();
  response = result.choices[0].message;
  return JSON.parse(response.content);
}
