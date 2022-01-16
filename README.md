# Rollbot

A TFT Ultimate Bravery Rollbot for Discord and Terminal

Bot for rolling ultimate bravery for TFT.

If inputing multiple players, avoid giving people the same comps.

## Development

Uses [Deno](https://deno.land/) both for discord server, and for terminal.

| Use                | Command                                                      |
| ------------------ | ------------------------------------------------------------ |
| Run as CLI utility | `deno run ./source/cli.ts [playerNames ...]`                 |
| Run Discord Bot    | `deno run --allow-net --unstable ./source/discord-server.js` |

## Usage

### Discord Bot

```
!roll

TFT RollBot (Season 6):
  👑 Graves
  👨‍👩‍👦 Academy + Twinshot
```

```
!roll @player1 @player2 @player3

TFT RollBot (Season 6):

@player1
  King: Quinn
  Team: Sniper + Mercenary

@player2
  King: DingerDonger
  Team: Innovator + Socialite

@player3
  King: Jinx
  Team: Twinshot + Imperial
```

### Terminal

#### Installation

`deno install --name=roll https://raw.githubusercontent.com/ivebencrazy/tft-rollbot/master/source/cli.ts`

#### Usage

```
roll

TFT RollBot (Season 6):

  King: Twisted Fate
  Team: Arcanist + Yordle
```

```
roll @player1 @player2 @player3

TFT RollBot (Season 6):

@player1
  King: Twitch
  Team: Assassin + Academy

@player2
  King: Caitlyn
  Team: Sniper + Clockwork

@player3
  King: Urgot
  Team: Arcanist + Imperial
```

#### Options

NOTE: There are not currently implemented.

`--include-all` By default, we ignore 1-2 champion sets. This includes them.

`--no-dedupe` By default, we try to distribute traits and kings so that two
people don't have the same trait and don't have the same king. Adding no-dedupe
option means all traits are completely random.
