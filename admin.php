<?php
header("Cache-Control: no-cache");
header("Pragma: no-cache");
?>

<!DOCTYPE html>
<!-- © Suunnitellut & toteuttanut Ikatyros NY 2021 -->
<html lang="fi">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-control" content="No-Cache">
    <meta http-equiv="Pragma" content="No-Cache">
    <link rel="shortcut icon" href="./img/logos/mikkelin-keilahalli-admin-round.png" type="image/x-icon">
    <title>Admin - Mikkelin Keilahalli</title>
    <link rel="stylesheet" href="./css/admin.css">
    <script type="text/javascript" src="./js/jquery-3.6.0.min/jquery.js"></script>
</head>

<body>
    <panel>
        <div class="home" onclick="window.location = './';">
            <img src="./img/home.png" alt="Palaa etusivulle">
        </div>
        <button type="button" id="save-changes">
            <img src="./img/save.png" alt="Tallenna">
            Tallenna muutokset
        </button>
        <button type="button" class="save-activity" id="tapahtumaosio">
            <img src="./img/save.png" alt="Tallenna">
            <p>Luo uusi tapahtumailmoitus</p>
        </button>
        <button type="button" class="add-activity" id="kilpailuosio">
            <img src="./img/save.png" alt="Tallenna">
            <p>Luo uusi kilpailuilmoitus</p>
        </button>
        <div class="help">
            <a href="./content/uploads/sivusto-manuaali.pdf#page=9" target="#">Tarvitsetko apua? Lue Admin-sivuston manuaali.</a>
        </div>
    </panel>
    <container>
    <section id="schedule">
            <div class="title">
                <img src="./img/clock.gif" alt="Kello">
                <h1>Aukioloajat</h1>
            </div>
            <ul>
                <li>
                    <h1>Ma</h1>
                    <div class="time">
                        <h4>Normi</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                    <div class="time">
                        <h4>Hohto</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                </li>
                <li>
                    <h1>Ti</h1>
                    <div class="time">
                        <h4>Normi</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                    <div class="time">
                        <h4>Hohto</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                </li>
                <li>
                    <h1>Ke</h1>
                    <div class="time">
                        <h4>Normi</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                    <div class="time">
                        <h4>Hohto</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                </li>
                <li>
                    <h1>To</h1>
                    <div class="time">
                        <h4>Normi</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                    <div class="time">
                        <h4>Hohto</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                </li>
                <li>
                    <h1>Pe</h1>
                    <div class="time">
                        <h4>Normi</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                    <div class="time">
                        <h4>Hohto</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                </li>
                <li>
                    <h1>La</h1>
                    <div class="time">
                        <h4>Normi</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                    <div class="time">
                        <h4>Hohto</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                </li>
                <li>
                    <h1>Su</h1>
                    <div class="time">
                        <h4>Normi</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                    <div class="time">
                        <h4>Hohto</h4>
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                        <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                        <input type="number" min="0" max="23" placeholder="23">
                        .
                        <input type="number" min="0" max="59" placeholder="00">
                    </div>
                </li>
            </ul>
        </section>
        <section>
            <div id="titlecard-title">
                <div class="webflow-style-input">
                    <input type="text" placeholder="Etusivun kansiotsikko..." id="title-main" onKeyPress="return check(event,value)" onInput="checkLength(60,this)">
                    <p>60</p>
                </div>
                <div class="webflow-style-input">
                    <input type="text" placeholder="Etusivun alaotsikko..." id="title-sub" onKeyPress="return check(event,value)" onInput="checkLength(40,this)">
                    <p>40</p>
                </div>
            </div>
            <div id="pricing">
                <div class="title">
                    <h1>Hinnasto</h1>
                </div>
                <ul>
                    <li id="hohto">
                        <div>
                            <h2>Hohtokeilaus</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="day">
                        <div>
                            <h2>Päivä</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="night">
                        <div>
                            <h2>Ilta</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="weekend">
                        <div>
                            <h2>Viikonloppu</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="equipment">
                        <div>
                            <h2>Välinevuokraus</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="discount">
                        <div>
                            <h2>Keilausalennus</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="snooker">
                        <div>
                            <h2>Biljardi</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="birthday_small">
                        <div>
                            <h2>Pieni synttäripaketti</h2>
                        </div>
                        <div class="item">
                            <h4>Normi</h4>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                            <h4>Hohto</h4>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="birthday_big">
                        <div>
                            <h2>Iso synttäripaketti</h2>
                        </div>
                        <div class="item">
                            <h4>Normi</h4>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                            <h4>Hohto</h4>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <section id="activities">
            <div class="header">
                Tapahtumailmoitukset
            </div>
            <activities>
                <noactivities>Keilahallilla ei ole tällä hetkellä ilmoituksia.</noactivities>
            </activities>
            <creator>
                <h1 class="header">Luo uusi ilmoitus:</h1>
                <div class="cover-image">
                    <h2>Ilmoituksen kansikuva</h2>
                    <img src="">
                    <video src="" controls></video>
                    <iframe src="" type="application/pdf" width="100%" frameborder="0"></iframe>
                    <input type="file" id="cover-image-file-input">
                </div>
                <div>
                    <h2>Ilmoituksen alkamis - loppumispäivä</h2>
                    <input type="date" id="start-date">
                    →
                    <input type="date" id="end-date">
                </div>
                <div class="eghu">
                    <insert>
                        <textarea id="content" cols="30" rows="10" placeholder="Ilmoituksen tekstisisältö (ei pakollinen)..."></textarea>
                        <div class="attachment-container">
                            <h2>Ilmoituksen linkit</h2>
                        </div>
                    </insert>
                    <links></links>
                    <button type="button" id="add-attachment">Lisää toinen linkki</button>
                    <p>Linkit ja liitteet tukevat .pdf, .png, .jpg, .jpeg ja .gif -muotoja</p>
                </div>
                <div id="links" class="item">
                    <div class="webflow-style-input">
                        <input class="" type="email" placeholder="Lisää osoite..."></input>
                    </div>
                </div>
            </creator>
        </section>
        <section id="gallery">
            <h1 class="header">Galleria</h1>
            <div class="content"></div>
            <form id="gallery-new-input" action="./admin/gallery_post.php" method="post" enctype="multipart/form-data">
                <input type="file" name="gallery-images[]" multiple id="file-input">
                <input type="submit" value="Lisää uudet kuvat">
                <p>Galleria tukee .jpg, .png, .gif, .mp4 ja .mov -tiedostoja</p>
            </form>
        </section>
    </container>
</body>

<footer>
    <script type="text/javascript" src="./js/moment.js"></script>
    <script type="text/javascript" src="./js/main.js"></script>
    <script type="text/javascript" src="./js/admin.js"></script>
    <?php
    $arr = [];
    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator('content/gallery'),
        RecursiveIteratorIterator::SELF_FIRST
    );
    function addToArr($item) {
        if (strlen($item) < 4) return;
        global $arr;
        array_push($arr, "./$item");
    }
    foreach ($iterator as $file) {
        addToArr(str_replace("\\", "/", $file));
    }
    $data = json_encode($arr, JSON_HEX_AMP | JSON_HEX_TAG);
    echo "<script type='text/javascript'>galleryAddOldPreviews(" . $data . ");</script>";
    ?>
</footer>

</html>