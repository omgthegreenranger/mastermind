export function devSolve(codemaker) {
    let solve = document.getElementById("dev-solve");
    solve.innerHTML += `<div class="colour-options">
      <div class="colour choice" style="background-color: var(${
        codemaker[0]
      })">Hello</div>
      <div class="colour choice" style="background-color: var(${
        codemaker[1]
      })">Hello</div>
      <div class="colour choice" style="background-color: var(${
        codemaker[2]
      })">Hello</div>
      <div class="colour choice" style="background-color: var(${
        codemaker[3]
      })">Hello</div>
      </div>
      `;
  }