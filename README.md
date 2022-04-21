[![Check dist](https://github.com/opt-nc/domaine-nc-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/opt-nc/domaine-nc-action/actions/workflows/check-dist.yml)
[![units-test](https://github.com/opt-nc/domaine-nc-action/actions/workflows/test.yml/badge.svg)](https://github.com/opt-nc/domaine-nc-action/actions/workflows/test.yml)

# 💻 domaine-nc-action

GitHub Action to check if your `*.nc` domain name is not expired and when it will be.

## ✅ Usage

👉 Under the hoods, [domain-nc Free Rapid API](https://rapidapi.com/opt-nc-opt-nc-default/api/domaine-nc) is called, so you need a registration key (_available for free_).

Let's see an example :

```yml
on:
  schedule:
    - cron: '0 7 * * *'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Get validity metadata for opt.nc
        id: metadata
        uses: opt-nc/domaine-nc-action@v1
        with:
          api-key: ${{ secrets.RAPID_API_KEY }}
          name: opt

      - name: Send a message to Slack if domain expires within 5 days
        if: ${{ steps.metadata.outputs.daysBeforeExpiration < 5 }}
        uses: bryannice/gitactions-slack-notification@2.0.0
        env:
          SLACK_INCOMING_WEBHOOK: ${{ secrets.SLACK_INCOMING_WEBHOOK }}
          SLACK_MESSAGE: opt.nc will expires in less than 5 days
          SLACK_TITLE: Domain name expiration reminder
```

In this example, a Slack message is send based on the output of the action for domain name `opt.nc`.

### ℹ️ Configuration

| name      | description                                                          | required | default |
| --------- | -------------------------------------------------------------------- | -------- | ------- |
| `api-key` | RapidAPI key                                                         | yes      |         |
| `name`    | Domain name witout extension                                         | yes      |         |
| `ext`     | Domain extension between :<br> - `nc`<br> - `asso.nc`<br> - `nom.nc` | yes      | `nc`    |

### ⏬ Outputs

| name                   | description                               |
| ---------------------- | ----------------------------------------- |
| `expired`              | `'true'` or `'false'`                     |
| `expirationDate`       | `'yyyy-mm-dd'`                            |
| `daysBeforeExpiration` | Number of days before domain name expires |

## Go see the demo worflow ! 🎇

It's [here](https://github.com/opt-nc/domaine-nc-action-demo) !

Enjoy 👍
