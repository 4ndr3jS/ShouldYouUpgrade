const ageSlider = document.getElementById('age');
const ageValue = document.getElementById('ageValue');
const satisfactionSlider = document.getElementById('satisfaction');
const satisfactionValue = document.getElementById('satisfactionValue');

const satisfactionLabels = {
    1: '1 - Painfully slow',
    2: '2 - Frustrating',
    3: '3 - It\'s okay',
    4: '4 - Pretty good',
    5: '5 - Still great'
};

ageSlider.addEventListener('input', (e) => {
    const years = parseFloat(e.target.value);
    ageValue.textContent = years === 1 ? '1 year' : `${years} years`;
});

satisfactionSlider.addEventListener('input', (e) => {
    satisfactionValue.textContent = satisfactionLabels[e.target.value];
});

function toggleCheckbox(item) {
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

function checkUpgrade() {
    const deviceType = document.getElementById('deviceType').value;
    const age = parseFloat(document.getElementById('age').value);
    const satisfaction = parseInt(document.getElementById('satisfaction').value);
    const budget = document.getElementById('budget').value;

    const problems = {
        battery: document.getElementById('battery').checked,
        performance: document.getElementById('performance').checked,
        storage: document.getElementById('storage').checked,
        compatibility: document.getElementById('compatibility').checked,
        none: document.getElementById('none').checked
    };

    let verdict, reasoning, suggestion, resultClass;

    const hasProblems = problems.battery || problems.performance || problems.storage || problems.compatibility;
    
    if (age >= 4 && satisfaction <= 2) {
        verdict = 'Upgrade Now';
        reasoning = `Your ${deviceType} is ${age} years old and you're unhappy with its performance. So i think it's time for an upgrade.`;
        resultClass = 'upgrade';
        
        if (budget === 'low') {
            suggestion = '<strong>Suggestion:</strong> Consider refurbished or last-gen models for better value.';
        } else {
            suggestion = '<strong>Suggestion:</strong> Look for the latest models with improvements in the areas you care about.';
        }
    } else if (age >= 3 && satisfaction <= 3 && hasProblems) {
        verdict = 'Consider Waiting';
        reasoning = `Your ${deviceType} is ${age} years old with some issues, but it's fixable.`;
        resultClass = 'wait';
        
        if (problems.battery && (deviceType === 'phone' || deviceType === 'laptop')) {
            suggestion = '<strong>Suggestion:</strong> Try replacing the battery first (~$50-150). This could extend life by 1-2 years.';
        } else if (problems.storage && deviceType === 'pc') {
            suggestion = '<strong>Suggestion:</strong> Adding an SSD or more storage is much cheaper than a full upgrade.';
        } else if (problems.performance && deviceType === 'pc') {
            suggestion = '<strong>Suggestion:</strong> Try adding RAM or upgrading specific components first.';
        } else {
            suggestion = '<strong>Suggestion:</strong> Wait for next-gen releases or major sales. Your device can hold on a bit longer.';
        }
    } else if (age < 2 || satisfaction >= 4) {
        verdict = 'Not Worth It';
        reasoning = age < 2 
            ? `Your ${deviceType} is only ${age} years old. That's too new to upgrade.`
            : `You're satisfied with your ${deviceType}'s performance. No need to upgrade.`;
        resultClass = 'skip';
        
        if (hasProblems && !problems.none) {
            suggestion = '<strong>Suggestion:</strong> Try software optimization, clearing storage, or minor repairs instead of upgrading.';
        } else {
            suggestion = '<strong>Suggestion:</strong> Keep using it. Your device still has lots of life left.';
        }
    } else {
        verdict = 'Maybe Wait';
        reasoning = `Your ${deviceType} is ${age} years old and performing moderately. An upgrade would help, but isn't urgent.`;
        resultClass = 'wait';
        
        if (budget === 'high') {
            suggestion = '<strong>Suggestion:</strong> If you want the latest features, go for it. Otherwise, wait for the next generation.';
        } else {
            suggestion = '<strong>Suggestion:</strong> Wait 6-12 months for better deals or next-gen releases unless your needs change.';
        }
    }

    const resultDiv = document.getElementById('result');
    resultDiv.className = `result ${resultClass}`;
    resultDiv.innerHTML = `
        <div class="verdict">${verdict}</div>
        <div class="reasoning">${reasoning}</div>
        <div class="suggestion">${suggestion}</div>
    `;
    
    setTimeout(() => resultDiv.classList.add('show'), 100);
}