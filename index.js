const fs = require('fs');
const path = require('path');

// Function to load a JSON file
function loadJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error loading JSON file (${filePath}):`, error.message);
        return null;
    }
}

// Function to save JSON data to a new file with a timestamp
function saveJsonFile(filePath, data) {
    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
    const newFilePath = filePath.replace('.json', `_${timestamp}.json`);
    fs.writeFileSync(newFilePath, JSON.stringify(data, null, 2));
    console.log(`Saved manipulated data to ${newFilePath}`);
}

// Function to manipulate JSON data
function manipulateJsonData(jsonData) {
    return {
        "auto_pickup": true,
        "auto_pickup_items": [true, true, false, true, true],
        "auto_pickup_range": 110.0,
        "auto_puzzle": true,
        "autofarm_events": jsonData.map(item => ([
            {
                "type": 0,
                "value": { "X": item.x, "Y": item.y, "Z": item.z },
                "name": item.name
            },
            {
                "type": 1,
                "value": { "X": 20000.0, "Y": 0.0, "Z": 0.0 },
                "name": "wait"
            }
        ])).flat(),
        "cutscene_skip": true,
        "dmg_multiplier_amount": 100,
        "dmg_multiplier_enabled": true,
        "dmg_multiplier_keybind": 0,
        "esp_enabled": false,
        "esp_hide_completed": false,
        "esp_selected_items": [true, false, false, false, false, false, false],
        "fly_enabled": false,
        "fly_keybind": 0,
        "god_mode_enabled": true,
        "god_mode_keybind": 0,
        "horizontal_fly_speed": 15.2,
        "infinite_stamina": true,
        "kill_aura_attacks": 3,
        "kill_aura_enabled": true,
        "kill_aura_range": 110.0,
        "kill_aura_targets": [true, true, true],
        "menu_keybind": 45,
        "move_speed": 100.0,
        "move_speed_enabled": true,
        "no_clip": false,
        "no_fall": false,
        "no_skill_cooldown": true,
        "unlock_fps": false,
        "vertical_fly_speed": 15.2
    };
}

// Function to process all JSON files in a directory
function processJsonFiles(directoryPath) {
    fs.readdirSync(directoryPath).forEach(file => {
        const filePath = path.join(directoryPath, file);
        if (path.extname(file) === '.json') {
            const jsonData = loadJsonFile(filePath);
            if (jsonData) {
                const manipulatedData = manipulateJsonData(jsonData);
                saveJsonFile(filePath, manipulatedData);
            }
        }
    });
}

// Example usage
const baseDir = process.cwd();
const jsonDirectoryPath = path.join(baseDir, 'Uniwaves AUTOTP 6-29-2024 V1.1/V1.02-V1.1');
processJsonFiles(jsonDirectoryPath);
