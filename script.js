// Accessing HTML elements
const bulbsInput = document.getElementById('bulbs');
const fansInput = document.getElementById('fans');
const tvsInput = document.getElementById('tvs');
const refrigeratorsInput = document.getElementById('refrigerators');
const washingMachinesInput = document.getElementById('washingMachines');
const totalEnergyElement = document.getElementById('totalEnergy');
const backupDurationElement = document.getElementById('backupDuration');
const optimizationSuggestionsElement = document.getElementById('optimizationSuggestions');

// Power consumption values for different appliances (in watts)
const powerValues = {
  bulbs: 60,
  fans: 75,
  tvs: 100,
  refrigerators: 150,
  washingMachines: 500
};

// Function to calculate energy consumption and backup duration
function calculateEnergy() {
  // Get the input values
  const numBulbs = parseInt(bulbsInput.value);
  const numFans = parseInt(fansInput.value);
  const numTvs = parseInt(tvsInput.value);
  const numRefrigerators = parseInt(refrigeratorsInput.value);
  const numWashingMachines = parseInt(washingMachinesInput.value);

  // Calculate total energy consumption based on appliance usage
  const totalEnergy = calculateTotalEnergy(numBulbs, numFans, numTvs, numRefrigerators, numWashingMachines);
  totalEnergyElement.textContent = totalEnergy.toFixed(2);

  // Calculate backup duration based on battery capacity and estimated consumption
  const batteryCapacity = 30; // Battery capacity in watt-hours
  const backupDuration = calculateBackupDuration(totalEnergy, batteryCapacity);
  backupDurationElement.textContent = backupDuration;

  // Provide optimization suggestions based on power consumption analysis
  const suggestions = generateOptimizationSuggestions(totalEnergy);
  optimizationSuggestionsElement.textContent = suggestions;
}

// Function to calculate total energy consumption based on appliance usage
function calculateTotalEnergy(numBulbs, numFans, numTvs, numRefrigerators, numWashingMachines) {
  let totalEnergy = 0;

  // Multiply the number of appliances with their power consumption values
  totalEnergy += numBulbs * powerValues.bulbs;
  totalEnergy += numFans * powerValues.fans;
  totalEnergy += numTvs * powerValues.tvs;
  totalEnergy += numRefrigerators * powerValues.refrigerators;
  totalEnergy += numWashingMachines * powerValues.washingMachines;

  return totalEnergy / 1000; // Convert to kilowatt-hours
}

// Function to calculate backup duration based on battery capacity and estimated consumption
function calculateBackupDuration(totalEnergy, batteryCapacity) {
  const dailyEnergyConsumption = totalEnergy; // Assuming energy consumption is the same every day
  return (batteryCapacity / dailyEnergyConsumption).toFixed(1);
}

// Accessing HTML elements
const suggestionsTable = document.getElementById('suggestionsTable');

// Function to generate optimization suggestions in a table format
function generateOptimizationSuggestions(totalEnergy) {
  const optimizations = [
    { appliance: 'bulbs', powerValue: powerValues.bulbs, suggestion: 'Reduce the number of bulbs' },
    { appliance: 'fans', powerValue: powerValues.fans, suggestion: 'Reduce the number of fans' },
    { appliance: 'tvs', powerValue: powerValues.tvs, suggestion: 'Reduce the number of TVs' },
    { appliance: 'refrigerators', powerValue: powerValues.refrigerators, suggestion: 'Reduce the number of refrigerators' },
    { appliance: 'washingMachines', powerValue: powerValues.washingMachines, suggestion: 'Reduce the number of washing machines' }
  ];

  let tableHTML = '<table>';
  tableHTML += '<tr><th>Appliance</th><th>Suggestion</th><th>Potential Increase (Days)</th></tr>';

  optimizations.forEach(opt => {
    const powerConsumption = opt.powerValue * getApplianceCount(opt.appliance);
    const potentialIncrease = calculatePotentialIncrease(totalEnergy, powerConsumption);
    tableHTML += `<tr><td>${opt.appliance}</td><td>${opt.suggestion}</td><td>${potentialIncrease}</td></tr>`;
  });

  tableHTML += '</table>';

  suggestionsTable.innerHTML = tableHTML;
}



// Function to get the count of a particular appliance from the input field
function getApplianceCount(appliance) {
  const inputField = document.getElementById(appliance);
  return parseInt(inputField.value);
}

// Function to calculate the potential increase in backup duration
function calculatePotentialIncrease(totalEnergy, powerConsumption) {
  const batteryCapacity = 5000; // Battery capacity in watt-hours
  const currentBackupDuration = calculateBackupDuration(totalEnergy, batteryCapacity);
  const optimizedBackupDuration = calculateBackupDuration(totalEnergy - powerConsumption, batteryCapacity);
  const potentialIncrease = optimizedBackupDuration - currentBackupDuration;
  return potentialIncrease.toFixed(1);
}
