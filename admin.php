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
    <script type="text/javascript" src="./js/jquery-3.6.0.min/jquery.js"></script>
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


            <div>
                
                <form id="titlecard-title">
    
                    <h2>Pääotsikko</h2>
                    <div class="webflow-style-input">
                        <input type="text" placeholder="Etusivun kansiotsikko..." id="title-main" onKeyPress="return check(event,value)" onInput="checkLength(40,this)">
                        <p>40</p>
                    </div>

                    <h2>Alaotsikko</h2>
                    <div class="webflow-style-input">
                        <input type="text" placeholder="Etusivun alaotsikko..." id="title-sub" onKeyPress="return check(event,value)" onInput="checkLength(20,this)">
                        <p>20</p>
                    </div>

                    <button type="button">
                        <img src="./img/save.png" alt="Tallenna">
                        Tallenna uusi otsikko
                    </button>
    
                </form>

                <form id="pricing" name="pricing">
                    <div class="title">
                        <h1>Hinnasto</h1>
                    </div>
    
                    <ul>
                        <li id="hohto">
                            <img src="./img/bowler.png" alt="Hohto">
                            <div>
                                <h2>Hohtokeilaus</h2>
                                <h3>Ti - La 16.00 - 22.00</h3>
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
                                <h2>Päivä</h2>
                                <h3>Ti - Pe 12.00 - 17.00</h3>
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
                                <h2>Ilta</h2>
                                <h3>Ti - Pe 17.00 - 20.00</h3>
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
                                <h2>Viikonloppu</h2>
                                <h3>Ti - Pe 12.00 - 17.00</h3>
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
                            <img src="./img/excellent-service.png" alt="Alennus">
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
                            <img src="./img/snooker.png" alt="Biljardi">
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
                            <img src="./img/cake.png" alt="Pieni synttäripaketti">
                            <div>
                                <h2>Pieni synttäripaketti</h2>
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
                                <h2>Iso synttäripaketti</h2>
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

            </div>


            <div class="activities">

                <!-- List all existing activities -->
                <div class="activity-view">


                </div>

                <form action="" method="post" name="activities" id="activities">
                    <h1>Luo uusi ilmoitus</h1>
                    <select class="custom-select" id="activity-select">
                        <option value="0">Tapahtumailmoitus</option>
                        <option value="1">Kilpailuilmoitus</option>
                        <option value="2">Linkki sivustolle</option>
                    </select>

                    <div id="default" class="item">
                        <div class="cover-image">
                            <h2>Ilmoituksen kansikuva</h2>
                            <img src="./img/missing-image.jpg" alt="Kansikuva">
                            <input type="file" id="cover-image-file-input">
                        </div>
                        <div class="webflow-style-input">
                            <input type="text" placeholder="Ilmoituksen otsikko..." id="title" onKeyPress="return check(event,value)" onInput="checkLength(50,this)">
                            <p>50</p>
                        </div>
                        <div>
                            <h2>Ilmoituksen ajankohta</h2>
                            <img src="./img/clock.png" alt="Aloitus">
                            <input type="date" id="start-date">
                            <img src="./img/clock.png" alt="Lopetus">
                            <input type="date" id="end-date">
                        </div>
                        
                        <div>
                            <h2>Ilmoituksen sisältö</h2>
                            <div class="webflow-style-input">
                                <input type="text" placeholder="Ilmoituksen sisältö..." id="content">
                            </div>
                            
                            <h2>Ilmoituksen liitteet</h2>

                            <h3>Liitteen tyyppi</h3>
                            <select id="attachment-type">
                                <option value="0">Linkki</option>
                                <option value="1">Tiedosto</option>
                            </select>

                            <div class="sub-item" id="0">
                                <div class="webflow-style-input">
                                    <input type="text" placeholder="Liitteen otsikko..." id="title" onKeyPress="return check(event,value)" onInput="checkLength(30,this)">
                                    <p>30</p>
                                </div>
                                <div class="webflow-style-input">
                                    <input type="text" placeholder="Liitteen linkki..." id="link">
                                </div>
                            </div>

                            <div class="sub-item" id="1">
                                <div class="webflow-style-input">
                                    <input type="text" placeholder="Liitteen otsikko..." id="title" onKeyPress="return check(event,value)" onInput="checkLength(30,this)">
                                    <p>30</p>
                                </div>
                                <div class="pdf-container">
                                    <div class="item">
                                        <iframe src="./content/uploads/sivusto-manuaali.pdf" type="application/pdf" frameborder="0"></iframe>
                                        <div class="close">
                                            <img src="./img/close.png" alt="Poista ilmoitus">
                                        </div>
                                    </div>
                                </div>
                                <input type="file" name="Lisää tiedosto" id="files">
                            </div>
                        
                        </div>
                        
                        <button type="button">Lisää toinen liite</button>
                    </div>

                    <div id="links" class="item">
                        
                        <div class="webflow-style-input">
                            <input type="text" placeholder="Ilmoituksen otsikko..." id="title" onKeyPress="return check(event,value)" onInput="checkLength(50,this)">
                            <p>50</p>
                        </div>
                        <div>
                            <h2>Ilmoituksen ajankohta</h2>
                            <img src="./img/clock.png" alt="Aloitus">
                            <input type="date" id="start-date">
                            <img src="./img/clock.png" alt="Lopetus">
                            <input type="date" id="end-date">
                        </div>
                        <div class="webflow-style-input">
                            <input class="" type="email" placeholder="Linkin osoite..."></input>
                        </div>

                    </div>

                    <button type="button" id="submit">
                        <img src="./img/save.png" alt="Tallenna">
                        Tallenna uusi ilmoitus
                    </button>
                </form>

            </div>


            <form action="./admin/gallery_post.php" method="post" enctype="multipart/form-data" id="gallery">
                <h1>Galleria</h1>
                <div class="content"></div>
                <p>Galleria tukee .jpg, .png, .gif, .mp4 ja .mov -tiedostoja</p>
                <div class="gallery-new-input">
                    <input type="file" name="gallery-images[]" multiple id="file-input">
                    <input type="submit" value="Lisää uudet kuvat">
                </div>
            </form>

        </div>
    </div>

    <!-- all viewable activities are here -->
    <div class="overlay-container" style="display:none;">
        <div class="item">
            <div class="content">
                <div class="left">
                    <div class="header-img"></div>
                    <h1>
                        Aamukeilaus nyt käynnissä. Tule mukaan!
                    </h1>
                    <p>
                        Alkukilpailu 5.s EU. Rajaton uusinta. Tasoitukset 210-155 70%, maksimitasoitus 39p/s. Lämmittely 5 min. Kilpailumaksu 25€. Finaali lauantaina 4.9.2021 klo 12.00 alkaen. Finaaliin 20 parasta seuraavasti: 12 parasta 5.s EU tuloksella sekä 12 parhaan ulkopuolelta: paras B-luokan mies ja nainen, paras C-luokan mies ja nainen, paras D-luokan mies ja nainen sekä paras veteraanimies ja -nainen. Finaalin ensimäisessä osassa pelataan 5s. Am, jonka jälkeen ensimmäisen osion 6 parasta pelaa Round Robin kierroksen ilman sijoitussarjaa.
                    </p>
                    <a href="http://tulokset.keilailu.fi/printpdfindex.php?reportid=10&id=77942&id2=22" target="#">Tulokset</a>
                    <a href="https://www.varaavuoro.com/mikkeli/competitions" target="#">Vuoron varaus</a>
                </div>
                <div class="right">
                    <div class="media">
                        <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/kesakaadot.pdf" frameborder="0"></iframe>
                        <iframe src="https://www.hohtokeilailu.fi/wp-content/uploads/2021/06/vph-kuljetus-kesa-kaadot.pdf" frameborder="0"></iframe>
                    </div>
                </div>
                <div class="close">
                    <img src="./img/close.png" alt="Sulje näkymä">
                </div>
            </div>
        </div>
    </div>

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