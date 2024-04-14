import { Plugin, PluginSettingTab, Setting, Notice, App } from 'obsidian';
import { exec } from 'child_process';

export default class ArcheryPlugin extends Plugin {
    directoryPath: string = '.'; // Default directory path

    async onload() {
		new Notice('plugin loading');

        this.addCommand({
            id: 'total-arrow-scores',
            name: 'Total Arrow Scores',
            callback: () => this.totalArrowScores(),
        });
		new Notice('command added');

        await this.loadSettings();
		new Notice('settings tab loaded');
        this.addSettingTab(new ArcherySettingsTab(this.app, this));
    }

    async loadSettings() {
        const data = await this.loadData();
		try {
			this.directoryPath = data.directoryPath;
		}
		catch {
			this.directoryPath = '.';
    }
	}

    async saveSettings() {
        await this.saveData({ directoryPath: this.directoryPath });
    }

    totalArrowScores() {
		const activeFile = this.app.workspace.getActiveFile();
        if (activeFile) {
            const fileName = activeFile.basename;
            console.log(`Currently opened file: ${fileName}`);
			

            // Logic to total arrow scores
            const command = `python3 ${this.directoryPath}arrowscores.py total ${fileName}`; // Replace with your logic
			new Notice(`python3 ${this.directoryPath}arrowscores.py total ${fileName}`);
			new Notice(`Totaling arrow scores contained in ${fileName}...`);
			new Notice('ping');
            
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
					new Notice(`${error} error`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            });
        } else {
            console.warn('No active file opened');
			new Notice('No active file opened');
        }
    }
}

class ArcherySettingsTab extends PluginSettingTab {
    plugin: ArcheryPlugin;

    constructor(app: App, plugin: ArcheryPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Archery Plugin Settings' });

        new Setting(containerEl)
            .setName('Working Directory')
            .setDesc('Specify the directory where the arrow scores should be totaled.')
            .addText(text => text
                .setPlaceholder('/path/to/your/directory')
                .setValue(this.plugin.directoryPath)
                .onChange(async (value) => {
                    this.plugin.directoryPath = value;
                    await this.plugin.saveSettings();
                }));
    }
}
