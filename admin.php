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

    <script src="./js/jquery-3.6.0.min/jquery.js"></script>
</head>

<body>
    <div class="admin-panel">
        <div class="nav">
            <div class="home" onclick="window.location = './';">
                <img src="./img/home.png" alt="Palaa etusivulle">
            </div>
            <div class="help">
                <a href="./content/uploads/sivusto-manuaali.pdf#page=4" target="#">Tarvitsetko apua? Lue manuaalin Admin-sivuston osio.</a>
            </div>
        </div>
        <div class="content">
            <form id="schedule" name="schedule">
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
                    <li id="hohto">
                        <img src="./img/bowler.png" alt="Hohto">
                        <div>
                            <h1>Hohtokeilaus</h1>
                            <h2>Ti - La 16.00 - 22.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="day">
                        <img src="./img/day.png" alt="Päivä">
                        <div>
                            <h1>Päivä</h1>
                            <h2>Ti - Pe 12.00 - 17.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="night">
                        <img src="./img/night.png" alt="Ilta">
                        <div>
                            <h1>Ilta</h1>
                            <h2>Ti - Pe 17.00 - 20.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="weekend">
                        <img src="./img/calendar.png" alt="Viikonloppu">
                        <div>
                            <h1>Viikonloppu</h1>
                            <h2>Ti - Pe 12.00 - 17.00</h2>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>
                    <li id="equipment">
                        <img src="./img/proshop/shoes/shoes.png" alt="Vuokraus">
                        <div>
                            <h1>Välinevuokraus</h1>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>

                    <li id="discount">
                        <img src="./img/excellent-service.png" alt="Alennus">
                        <div>
                            <h1>Keilausalennus</h1>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>

                    <li id="snooker">
                        <img src="./img/snooker.png" alt="Biljardi">
                        <div>
                            <h1>Biljardi</h1>
                        </div>
                        <div>
                            <div class="price">
                                <input type="number" name="" id="" min="0" placeholder="0">
                                €
                            </div>
                        </div>
                    </li>

                    <li id="birthday_small">
                        <img src="./img/cake.png" alt="Pieni synttäripaketti">
                        <div>
                            <h1>Pieni synttäripaketti</h1>
                        </div>
                        <img src="./img/bowling-pins.png" alt="Normihinta">
                        <div class="price">
                            <input type="number" name="" id="" min="0" placeholder="0">
                            €
                        </div>
                        <img src="./img/musical.png" alt="Hohtohinta">
                        <div class="price">
                            <input type="number" name="" id="" min="0" placeholder="0">
                            €
                        </div>
                    </li>
                    <li id="birthday_big">
                        <img src="./img/cake.png" alt="Iso synttäripaketti">
                        <div>
                            <h1>Iso synttäripaketti</h1>
                        </div>
                        <img src="./img/bowling-pins.png" alt="Normihinta">
                        <div class="price">
                            <input type="number" name="" id="" min="0" placeholder="0">
                            €
                        </div>
                        <img src="./img/musical.png" alt="Hohtohinta">
                        <div class="price">
                            <input type="number" name="" id="" min="0" placeholder="0">
                            €
                        </div>
                    </li>
                </ul>
                <button type="button">
                    <img src="./img/save.png" alt="Tallenna">
                    Tallenna hinnan muutos
                </button>
            </form>

            <form action="" method="post" name="activities" id="activities">
                <h1>Luo uusi ilmoitus</h1>
                <select name="" id="activity-select">
                    <option value="0">Tapahtumailmoitus</option>
                    <option value="1">Kilpailuilmoitus</option>
                    <option value="2">Linkki sivustolle</option>
                </select>
                
                <div id="events" class="item">
                    <div class="webflow-style-input">
                        <input type="text" placeholder="Ilmoituksen otsikko..." id="title">
                        <button type="submit"></button>
                        <p>40</p>
                    </div>
                    <div>
                        <h2>Ilmoituksen ajankohta</h2>
                        <img src="./img/clock.png" alt="Aloitus">
                        <input type="date" id="start-time">
                        <img src="./img/clock.png" alt="Lopetus">
                        <input type="date" id="end-time">
                    </div>
                </div>

                <div id="competitions" class="item">
                    <div class="webflow-style-input">
                        <input type="text" placeholder="Ilmoituksen otsikko..." id="title">
                        <button type="submit"></button>
                        <p>40</p>
                    </div>
                    <div>
                        <h2>Ilmoituksen ajankohta</h2>
                        <img src="./img/clock.png" alt="Aloitus">
                        <input type="date" id="start-time">
                        <img src="./img/clock.png" alt="Lopetus">
                        <input type="date" id="end-time">
                    </div>
                    <div>
                        <h2>Ilmoituksen linkit</h2>
                        <div class="webflow-style-input">
                            <input type="text" placeholder="Linkki VaraaVuoro.com..." id="link">
                            <button type="submit"></button>
                        </div>
                    </div>
                    <div>
                        <h2>Lisää tiedosto</h2>
                        <div class="pdf-container"></div>

                        <input type="text" placeholder="Lisää ilmoitukseen...">
                        <input type="file" name="Lisää tiedosto" multiple id="files">
                        <input type="button" value="+">
                    </div>
                </div>

                <div id="links" class="item">
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
                <div class="container" id="old">
                    <h1>Galleria</h1>
                    <div class="content"></div>
                    <p>Galleria tukee .jpg, .png, .gif, .mp4 ja .mov -tiedostoja</p>
                </div>
                <div class="container" id="new">
                    <h2>[YHDISTÄ TÄMÄ OSIO Lisää Galleriaan]</h2>
                    <div class="content"></div>
                    <input type="file" name="gallery-images[]" multiple id="file-input">
                    <input type="submit" value="Lisää uudet kuvat">
                </div>
            </form>

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