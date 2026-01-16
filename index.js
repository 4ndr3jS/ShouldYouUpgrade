function toggleCheckbox(item){
    const checkbox = item.querySelector('input');
    checkbox.checked = !checkbox.checked;
    item.classList.toggle('checked', checkbox.checked);

    const noneCheckbox = document.getElementById('none');
    const otherCheckboxes = document.querySelectorAll('.checkboxItem input:not(#none)');

    if(checkbox.id === 'none' && checkbox.checked) {
        otherCheckboxes.forEach(cb => {
            cb.checked = false;
            cb.closest('.checkboxItem').classList.remove('checked');
        });
    }else if(checkbox.id !== 'none' && checkbox.checked) {
        noneCheckbox.checked = false;
        noneCheckbox.closest('.checkboxItem').classList.remove('checked');
    }
}

function checkUpgrade(){
    const deviceType = document.getElementById('deviceType').value;
    const age = parseFloat(document.getElementById('age').value);
    
    const problems = {
        battery: document.getElementById('battery').checked,
        performance: document.getElementById('performance').checked,
        none: document.getElementById('none').checked
    }

    let verdict, reasoning, resultClass;

    const hasProblems = problems.battery || problems.performance;

    if(age >= 4){
        verdict = 'Upgrade Now';
        reasoning = `Your ${deviceType} is ${age} years old, i think you should upgrade`;
        resultClass = 'upgrade';
    }else if(age >= 3 && hasProblems){
        verdict = 'Consider Waiting';
        reasoning = `Your ${deviceType} is ${age} years old with some issue, but try fixing them first`;
        resultClass = 'wait';
    }else if(age < 2){
        verdict = 'Now Worth It';
        reasoning = `Your ${deviceType} is only ${age} years old. That's too new to upgrade.`;
        resultClass = 'skip';
    }

    const resultDiv = document.getElementById('result');
    resultDiv.className = `result ${resultClass}`;
    resultDiv.innerHTML = `
        <div class="verdict">${verdict}</div>
        <div class="reasoning">${reasoning}</div>
    `;

    setTimeout(() => resultDiv.classList.add('show'), 100);
}