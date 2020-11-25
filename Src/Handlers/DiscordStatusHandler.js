let fetch = require("node-fetch");
let url = "https://srhpyqt94yxb.statuspage.io/api/v2/summary.json";

let components = [
    ["CloudFlare"],
    ["Voice"],
    ["API"],
    ["Tax Calculation Service"],
    ["Gateway"],
    ["Push Notifications"],
    ["Media Proxy"],
    ["Third-party"],
    ["EU West"],
    ["US West"],
    ["EU Central"],
    ["Brazil"],
    ["Singapore"],
    ["Hong Kong"],
    ["Sydney"],
    ["Russia"],
    ["US Central"],
    ["Japan"],
    ["US East"],
    ["South Africa"],
    ["US South"],
];

async function Status() {
    try {
        var data = await fetch(url).then((r) => r.json());
        components.map((c, i) => {
            let res = data.components.find((x) => x.name === c[0]);
            components[i][1] = res ? res.status === "operational" ? "✅" : "❎" : "❓";
        });
        return {
            fields: [{
                    name: "— Services",
                    value: [
                        "```yaml",
                        `CloudFlare │ ${[components[0][1]]} |`,
                        `Voice      | ${[components[1][1]]} │`,
                        `API        │ ${[components[2][1]]} |`,
                        `Tax Calc   | ${[components[3][1]]} │`,
                        `Gateway    │ ${[components[4][1]]} |`,
                        `Push Notifs| ${[components[5][1]]} │`,
                        `Med. Proxy │ ${[components[6][1]]} |`,
                        `Third-party| ${[components[7][1]]} │`,
                        "```"
                    ].join("\n"),
                    inline: true

                },
                {
                    name: "— VC Server Statuses",
                    value: [
                        "```yaml",
                        `EU West    │ ${[components[8][1]]} |`,
                        `US West    | ${[components[9][1]]} │`,
                        `EU Central │ ${[components[10][1]]}  |`,
                        `Brazil     | ${[components[11][1]]} │`,
                        `Singapore  │ ${[components[12][1]]} |`,
                        `Hong Kong  | ${[components[13][1]]} │`,
                        `Sydney     │ ${[components[14][1]]} |`,
                        `Russia     | ${[components[15][1]]} │ `,
                        `US Central │ ${[components[16][1]]} |`,
                        `Japan      | ${[components[17][1]]} │ `,
                        `US East    │ ${[components[18][1]]} |`,
                        `South Afr  | ${[components[19][1]]} │`,
                        `US South   │ ${[components[20][1]]} │ `,
                        "```"
                    ].join("\n"),
                    inline: true
                },
                {
                    name: "— Maintenance & Incidents",
                    value: `\`\`\`yaml\n${data.incidents ? "No Incidents Reported." : data.incidents}\`\`\``,
                    inline: true
                },
            ],
            timestamp: new Date()
        }
    } catch (e) {
        console.log(e);
    }
}

module.exports = Status;