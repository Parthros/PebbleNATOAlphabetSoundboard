module.exports = [
  {
    "type": "heading",
    "id": "AppConfig",
    "defaultValue": "NATO Alphabet Soundboard Configuration"
  },
  {
    "type": "text",
    "id": "IntroText",
    "defaultValue": "Adjust the colors of the soundboard here."
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