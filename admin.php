<!DOCTYPE html>
<!-- © Suunnitellut & toteuttanut Ikatyros NY 2021 -->
<html lang="fi">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mikkelin Keilahalli - Admin</title>
    <link rel="shortcut icon" href="./img/logos/mikkelin-keilahalli-admin-round.png" type="image/x-icon">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/admin.css">

    <!-- tells browser not to cache -->
    <meta http-equiv="cache-control" content="no-cache">
    <!-- says that the cache expires 'now' -->
    <meta http-equiv="expires" content="0">
    <!-- says not to use cached stuff, if there is any -->
    <meta http-equiv="pragma" content="no-cache">

    <!-- pdfobject-2.2.6 -->
    <script type="text/javascript" src="./js/pdfobject-2.6.6/pdfobject.js"></script>

    <script src="./js/jquery-3.6.0.min/jquery.js"></script>

    <?php
    // include other php files to save data.
    require_once './admin/gallery_post.php';
    require_once './admin/schedule_post.php';
    ?>
</head>

<body>
    <div class="mainpage-preview">
        <?php
        // load up the preview for the main page that is being edited.
        // require_once './content/index.html';
        ?>
    </div>

    <div class="admin-panel">
        <div class="anchors">
            <div class="control">
                <img src="./img/button-arrow.png" alt="Pienennä ohjauspaneeli">
            </div>
            <div class="prop">
                <h2>Pääsivu</h2>
                <h4>Aukioloajat</h4>
                <h4>Hinnasto</h4>
                <h4>Ilmoitukset</h4>
                <h4>Galleria</h4>
                <h5>Vanha media</h5>
                <h5>Uusi media</h5>
            </div>
            <div class="help">
                <a href="./content/uploads/mikkelinkeilahalli-sivuston-käyttöohjeet.pdf" target="#">Tarvitsetko apua? Lue manuaali.</a>
            </div>
            <div class="home" onclick="window.location = './';">
                <img src="./img/home.png" alt="Palaa etusivulle">
            </div>
        </div>
        <div class="content">
            <form action="./admin/schedule_post.php" method="post" id="schedule" name="schedule">
                <div class="title">
                    <img src="./img/clock.gif" alt="Kello">
                    <h1>Aukioloajat</h1>
                </div>
                <ul>
                    <li>
                        <h1>Ma</h1>
                        <div class="time">
                            <img src="./img/bowling-pins.png" alt="Normikeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                        <div class="time">
                            <img src="./img/musical.png" alt="Hohtokeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li>
                        <h1>Ti</h1>
                        <div class="time">
                            <img src="./img/bowling-pins.png" alt="Normikeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                        <div class="time">
                            <img src="./img/musical.png" alt="Hohtokeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li>
                        <h1>Ke</h1>
                        <div class="time">
                            <img src="./img/bowling-pins.png" alt="Normikeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                        <div class="time">
                            <img src="./img/musical.png" alt="Hohtokeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li>
                        <h1>To</h1>
                        <div class="time">
                            <img src="./img/bowling-pins.png" alt="Normikeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                        <div class="time">
                            <img src="./img/musical.png" alt="Hohtokeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li>
                        <h1>Pe</h1>
                        <div class="time">
                            <img src="./img/bowling-pins.png" alt="Normikeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                        <div class="time">
                            <img src="./img/musical.png" alt="Hohtokeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li>
                        <h1>La</h1>
                        <div class="time">
                            <img src="./img/bowling-pins.png" alt="Normikeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                        <div class="time">
                            <img src="./img/musical.png" alt="Hohtokeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li>
                        <h1>Su</h1>
                        <div class="time">
                            <img src="./img/bowling-pins.png" alt="Normikeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                        <div class="time">
                            <img src="./img/musical.png" alt="Hohtokeilaus">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                            <img id="middle" src="./img/triple-arrow-right.png" alt="Auki -> Kiinni">
                            <input type="number" min="0" max="23" placeholder="23">
                            :
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                </ul>
                <button type="button">
                    <img src="./img/save.png" alt="Tallenna">
                    Tallenna ajan muutos
                </button>
            </form>

            <form action="./admin/pricing_post.php" method="post" id="pricing" name="pricing">
                <div class="title">
                    <h1>Hinnasto</h1>
                </div>

                <ul>
                    <li>
                        <img src="./img/bowler.png" alt="Hohto">
                        <div>
                            <h1>Hohtokeilaus</h1>
                            <h2>Ti - La 16.00 - 22.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="00">
                                €
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="./img/day.png" alt="Päivä">
                        <div>
                            <h1>Päivä</h1>
                            <h2>Ti - Pe 12.00 - 17.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="00">
                                €
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="./img/night.png" alt="Ilta">
                        <div>
                            <h1>Ilta</h1>
                            <h2>Ti - Pe 17.00 - 20.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="00">
                                €
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="./img/calendar.png" alt="Viikonloppu">
                        <div>
                            <h1>Viikonloppu</h1>
                            <h2>Ti - Pe 12.00 - 17.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="00">
                                €
                            </div>
                        </div>
                    </li>
                    <li>
                        <img src="./img/proshop/shoes/shoes.png" alt="Vuokraus">
                        <div>
                            <h1>Välinevuokraus</h1>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="00">
                                €
                            </div>
                        </div>
                    </li>

                    <li>
                        <img src="./img/excellent-service.png" alt="Alennus">
                        <div>
                            <h1>Opiskelija- ja eläkeläisalennus</h1>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="00">
                                €
                            </div>
                        </div>
                    </li>
                </ul>
                <button type="button">
                    <img src="./img/save.png" alt="Tallenna">
                    Tallenna hinnan muutos
                </button>

            </form>

            <!--
    Kun uutta kilpailuilmoitusta luodaan, siitä luodaan "content/activities" -kansioon
    uusi kansio, jonka nimi on sen "title":n ensimmäisen sanan ja "title":n kirjainten
    määrän päivän yhdistelmä, jotka on eroteltu "-".
    Kansiossa on kaikki siihen liittyvä sisältö.
-->
            <!-- id = title first word + day of date -->

            <form action="" method="post">
                <h1>Luo uusi ilmoitus</h1>
                <select name="" id="activity-select">
                    <option value="0">Tapahtumailmoitus</option>
                    <option value="1">Kilpailuilmoitus</option>
                    <option value="2">Linkki sivustolle</option>
                </select>

                <div id="events">

                    <div class="webflow-style-input">
                        <input class="" type="email" placeholder="Ilmoituksen otsikko..."></input>
                        <button type="submit"><i class="icon ion-android-arrow-forward"></i></button>
                        <p>40</p>
                    </div>
                    <div>
                        <h2>Ilmoituksen ajankohta</h2>

                        <img src="./img/clock.png" alt="Aloitus">
                        <input type="date" name="" id="">

                        <img src="./img/clock.png" alt="Lopetus">
                        <input type="date" name="" id="">
                    </div>

                </div>

                <div id="competitions">

                    <div class="webflow-style-input">
                        <input class="" type="email" placeholder="Ilmoituksen otsikko..."></input>
                        <button type="submit"><i class="icon ion-android-arrow-forward"></i></button>
                        <p>40</p>
                    </div>

                    <div>
                        <h2>Ilmoituksen ajankohta</h2>

                        <img src="./img/clock.png" alt="Aloitus">
                        <input type="date" name="" id="">

                        <img src="./img/clock.png" alt="Lopetus">
                        <input type="date" name="" id="">
                    </div>

                    <div>
                        <h2>Ilmoituksen linkit</h2>
                        <div class="webflow-style-input">
                            <input class="" type="email" placeholder="Linkki VaraaVuoro.com..."></input>
                            <button type="submit"><i class="icon ion-android-arrow-forward"></i></button>
                        </div>
                    </div>

                    <div>
                        <h2>Lisää tiedosto</h2>

                        <div class="pdf-container"></div>

                        <form action="" method="post">
                            <input type="text" placeholder="Lisää ilmoitukseen...">
                            <input type="file" name="Lisää tiedosto" id="">
                            <input type="button" value="+">
                        </form>
                    </div>

                    <div>

                        <input type="submit">

                    </div>

                </div>

                <div id="links">

                    <!-- Uusi linkki-ilmoitus -->

                    <div class="webflow-style-input">
                        <input class="" type="email" placeholder="Linkki ilmoitukseen..."></input>
                    </div>

                </div>

                <button type="button">
                    <img src="./img/save.png" alt="Tallenna">
                    Tallenna uusi ilmoitus
                </button>
            </form>

            <form action="./admin/gallery_post.php" method="post" enctype="multipart/form-data" id="gallery">
                <h1>Muokkaa Galleriaa</h1>
                <div class="container" id="old">
                    <h2>Poista vanhaa mediaa</h2>
                    <div class="content"></div>
                </div>
                <div class="container" id="new">
                    <h2>Lisää uutta mediaa</h2>
                    <div class="content"></div>
                    <input type="file" name="gallery-images[]" multiple id="file-input">
                    <input type="submit" value="Lisää uudet kuvat">
                </div>
            </form>

            <!--
                <div class="webflow-style-input">
                    <input class="" type="email" placeholder="What's your email?"></input>
                    <button type="submit"><i class="icon ion-android-arrow-forward"></i></button>
                </div>
            -->

        </div>
    </div>

</body>

<footer>

    <script src="./js/admin.js"></script>

    <?php
    $arr = [];

    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator('content/gallery'),
        RecursiveIteratorIterator::SELF_FIRST
    );

    function addToArr($item)
    {
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