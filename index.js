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

// Function to save JSON data to a new file with a timestamp in the {basedir}/eternals/ directory
function saveJsonFile(baseDir, originalFilePath, data, timestamp) {
    const fileName = path.basename(originalFilePath);
    const newFilePath = path.join(baseDir, `eternals/${timestamp}`, fileName);

    // Ensure the 'eternals' directory exists
    if (!fs.existsSync(path.join(baseDir, 'eternals'))) {
        fs.mkdirSync(path.join(baseDir, 'eternals'));
    }

    if (!fs.existsSync(path.join(baseDir, `eternals/${timestamp}`))) {
        fs.mkdirSync(path.join(baseDir, `eternals/${timestamp}`));
    }

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
function processJsonFiles(baseDir, directoryPath) {
    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
    fs.readdirSync(directoryPath).forEach(file => {
        const filePath = path.join(directoryPath, file);
        if (path.extname(file) === '.json') {
            const jsonData = loadJsonFile(filePath);
            if (jsonData) {
                const manipulatedData = manipulateJsonData(jsonData);
                saveJsonFile(baseDir, filePath, manipulatedData, timestamp);
            }
        }
    });
}

// Example usage
const baseDir = process.cwd();
const jsonDirectoryPath = path.join(baseDir, 'uniwaves');
processJsonFiles(baseDir, jsonDirectoryPath);
