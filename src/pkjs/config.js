module.exports = [
  {
    "type": "heading",
    "id": "AppConfig",
    "defaultValue": "App Configuration"
  },
  {
    "type": "text",
    "id": "IntroText",
    "defaultValue": "Here is some introductory text."
  },
  {
    "type": "section",
    "items": [
      {
        "type": "heading",
        "id": "Colors",
        "defaultValue": "Colors"
      },
      {
        "type": "color",
        "id": "BackgroundColor",
        "messageKey": "BackgroundColor",
        "defaultValue": "0x000000",
        "label": "Background Color"
      },
      {
        "type": "color",
        "id": "ForegroundColor",
        "messageKey": "ForegroundColor",
        "defaultValue": "0xFFFFFF",
        "label": "Foreground Color"
      }
    ]
  },
  {
    "type": "submit",
    "id": "SaveSettings",
    "defaultValue": "Save Settings"
  }
];