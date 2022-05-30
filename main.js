song ="";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rigthWristX = 0;
rightWristY = 0;
score_rw = 0;
score_lw = 0;
song_status = "";
song_status2 = "";

function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('Posenet is initialized')
}

function draw()
{
    image(video, 0, 0, 600, 500);
    song_status = song.isPlaying();
    song_status2 = song2.isPlaying();
    fill("purple");
    stroke("purple");
    if (score_rw > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();

        if(song_status == false)
        {
            song.play();
            document.getElementById("speed").innerHTML = "harry potter";
        }
    }

    if (score_lw > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song.stop();

        if(song_status2 == false)
        {
            song2.play();
            document.getElementById("volume").innerHTML = "random song";
        }
    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        score_rw = results[0].pose.keypoints[10].score;
        score_lw = results[0].pose.keypoints[9].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rightWristX + "rightWristY = " + rightWristY);
    }
}
