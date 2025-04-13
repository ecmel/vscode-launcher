# Visual Studio Code Launcher

The Visual Studio Code Launcher extension enhances your development workflow by providing a convenient launch action for files that match specific patterns. This allows you to quickly launch files directly from the editor.

## Usage

Once installed, you can configure the file patterns in your settings to specify which files should have the launch action available. Use the command palette or editor toolbar to execute the launch action on the selected file.

## Settings

To configure the Visual Studio Code Launcher extension, you can modify the settings in your `settings.json` file. Here are the available settings:

- `launcher.mappings`: An array of `name` - `pattern` mappings to specify which files should have which `launch.json` configuration action available. Example:
  ```json
  "launcher.mappings": [
    { "name": "Test", "pattern": "\\.test\\." }
  ]
  ```
  **Note**: `Test` is the name of the configuration defined in `launch.json`, and `pattern` is the regular expression to match.

### Sample Configuration

- [settings.json](https://github.com/ecmel/vscode-launcher/blob/main/.vscode/settings.json)
- [launch.json](https://github.com/ecmel/vscode-launcher/blob/main/.vscode/launch.json)

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request on the project's GitHub repository.
