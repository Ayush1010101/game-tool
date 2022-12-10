"use client";

import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useMemo, useRef, useState } from "react";
import "phaser";
import React from "react";
import Spinner from "components/Spinner";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";
import { random } from "lodash";

const generatedImagesAtom = atomWithStorage<{ key: string; url: string }[]>(
  "minnal-generated-images",
  []
);
const apiKeyAtom = atomWithStorage<string | null>(
  "minnal-replicate-apikey",
  null
);
const openAIKeyAtom = atomWithStorage<string | null>(
  "minnal-openai-apikey",
  null
);

export class Main extends Phaser.Scene {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  stars: any;
  bombs: any;
  platforms: any;
  cursors: any;
  score = 0;
  gameOver = false;
  scoreText: any;

  preload() {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //  A simple background for our game
    this.add.image(400, 300, "sky");

    //  The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();

    //  Now let's create some ledges
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    // The player and its settings
    this.player = this.physics.add.sprite(100, 450, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    this.stars.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.bombs = this.physics.add.group();

    //  The score
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      color: "#000",
    });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    );

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);

      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.anims.play("turn");
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);

    //  Add and update the score
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);

    if (this.stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      this.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      let x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      let bomb = this.bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
  }

  hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    this.gameOver = true;
  }
}

const createGame = () => {
  if (typeof window !== "object") {
    return;
  }

  let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false,
      },
    },
    parent: "game",
  };

  let game = new Phaser.Game(config);

  game.scene.add("Main", Main);
  game.scene.start("Main");

  return game;
};

export default function Page() {
  const [text, setText] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useAtom(generatedImagesAtom);
  const [replicateApiKey, setReplicateApiKey] = useAtom(apiKeyAtom);

  const [logicText, setLogicText] = useState("");
  const [openAIApiKey, setOpenAiApiKey] = useAtom(openAIKeyAtom);

  const [loading, setLoading] = useState<boolean>(false);
  const game = useRef(null);

  const scene = game.current?.scene?.scenes[0];
  useEffect(() => {
    if (game.current && scene) {
      scene.load.start();
      generatedImages.forEach((g) => {
        scene.load.image(g.key, g.url);
      });
    }
  }, [game?.current, scene]);

  useEffect(() => {
    if (game.current) {
      return;
    }

    game.current = createGame();
  }, []);

  const [name, setName] = useState("");
  const [error, setError] = useState<string>("");
  const handleGenerate = async (name: string, text: string) => {
    if (generatedImages.find((g) => g.key === name)) {
      setError(`please choose unique name, ${name} already exists}`);
      return;
    }
    console.log(text);
    console.log(replicateApiKey);
    const res = await fetch("/api/replicate", {
      method: "POST",
      body: JSON.stringify({
        prompt: text,
        apiKey: replicateApiKey,
      }),
    });
    const d = await res.json();
    console.log(d);

    setLoading(true);
    // waiting
    setTimeout(() => {
      pollForStatus(name, d.urls.get);
    }, 1000);
  };

  const pollForStatus = async (name, url) => {
    const res = await fetch("/api/replicate/status", {
      method: "POST",
      body: JSON.stringify({
        url: url,
        apiKey: replicateApiKey,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data?.status === "processing") {
      setTimeout(() => {
        pollForStatus(name, url);
      }, 1000);
    } else {
      setLoading(false);
      console.log(data.output);
      if (data.output.length) {
        const scene = game.current?.scene.scenes[0] as Phaser.Scene;

        scene.load.on("filecomplete", (key) => {
          setGeneratedImages((p) => [
            ...p,
            {
              key,
              url: data.output[0],
            },
          ]);
        });

        scene.load.on("addfile", () => {
          scene.load.start();
          console.log(scene.load.queue.getArray());
        });

        scene.load.image(name, data.output[0]);
      }
    }
  };

  const handleComplete = async (name: string, prompt: string) => {
    const res = await fetch("/api/openai/complete", {
      method: "POST",
      body: JSON.stringify({
        prompt: prompt,
        apiKey: openAIApiKey,
      }),
    });

    const data = await res.json();
    console.log("resp", data);

    setLogicText(prompt + data.choices[0].text);

    runCode(data.choices[0].text.trim());
  };

  const runCode = (code: string) => {
    //@ts-ignore
    window.scene = game.current?.scene.scenes[0] as Phaser.Scene;

    try {
      eval(`
      let scene = window.scene;
      ${code}
    `);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full justify-between flex">
      <div className="p-8 w-full flex space-y-2 flex-col">
        {/* ADD IMAGES to the game */}
        <div className="text-2xl">Add Images</div>
        <label htmlFor="apikey">Replicate API Key</label>
        <input
          id="apikey"
          className="border-2"
          onChange={(e) => setReplicateApiKey(e.currentTarget.value)}
          value={replicateApiKey}
        />

        {loading ? (
          <Spinner />
        ) : (
          <>
            {error.length ? (
              <span className="text-red-500">{error}</span>
            ) : null}
            <div className="flex items-center justify-between w-full">
              <div className="flex space-x-1">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={name}
                  className="border-2"
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <button
                disabled={!name || !!error.length}
                onClick={() => handleGenerate(name, text)}
                className="bg-blue-200 p-2 hover:opacity-50 active:scale-90 disabled:opacity-20 disabled:pointer-events-none"
              >
                Generate
              </button>
            </div>
            <TextareaAutosize
              maxRows={3}
              minRows={3}
              onFocus={() => {
                // need to do this to allow all keyboard input
                const scene = game.current?.scene.scenes[0];
                if (scene) {
                  scene.input.keyboard.disableGlobalCapture();
                }
              }}
              onBlur={() => {
                const scene = game.current?.scene.scenes[0];
                if (scene) {
                  scene.input.keyboard.disableGlobalCapture();
                }
              }}
              className="resize-none w-full whitespace-normal"
              defaultValue={text}
              onChange={(e) => {
                setText(e.currentTarget.value);
              }}
            />
          </>
        )}
        <div>
          Current Images
          <ul className="flex space-x-2">
            {generatedImages.map((d) => {
              return (
                <li key={d.url} className="bg-gray-100 p-2">
                  <div>Key: {d.key}</div>
                  <img src={d.url} width="50px" height="50px" />
                </li>
              );
            })}
          </ul>
        </div>

        {/* ADD Logic to the game */}
        <div className="text-2xl">Add Logic</div>
        <label htmlFor="apikey">OPEN API Key</label>
        <input
          id="apikey"
          className="border-2"
          onChange={(e) => setOpenAiApiKey(e.currentTarget.value)}
          value={openAIApiKey}
        />

        <>
          {error.length ? <span className="text-red-500">{error}</span> : null}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => handleComplete(name, logicText)}
              className="bg-blue-200 p-2 hover:opacity-50 active:scale-90 disabled:opacity-20 disabled:pointer-events-none"
            >
              Complete
            </button>
          </div>
          <TextareaAutosize
            maxRows={3}
            minRows={3}
            onFocus={() => {
              // need to do this to allow all keyboard input
              const scene = game.current?.scene.scenes[0];
              if (scene) {
                scene.input.keyboard.disableGlobalCapture();
              }
            }}
            onBlur={() => {
              const scene = game.current?.scene.scenes[0];
              if (scene) {
                scene.input.keyboard.disableGlobalCapture();
              }
            }}
            className="resize-none w-full whitespace-normal"
            value={logicText}
            onChange={(e) => {
              setLogicText(e.currentTarget.value);
            }}
          />
        </>
      </div>
      <div key={"game"} id="game" className="p-12"></div>
    </div>
  );
}
