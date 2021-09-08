<!DOCTYPE html>
<html lang="fi">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mikkelin Keilahalli - Admin</title>
    <link rel="shortcut icon" href="./img/logos/mikkelin-keilahalli-admin-round.png" type="image/x-icon">
    <link rel="stylesheet" href="./css/main.css">
    <link rel="stylesheet" href="./css/admin.css">

    <!-- pdfobject-2.2.6 -->
    <script type="text/javascript" src="./js/pdfobject-2.6.6/pdfobject.js"></script>

    <script src="./js/jquery-3.6.0.min/jquery.js"></script>
    
    <?php
        require_once('./admin/gallery_post.php');
    ?>
</head>

<body>
    <div class="mainpage-preview">
        <?php
            // require_once('./content/index.html');
        ?>
    </div>

    <!--
        Kun uutta kilpailuilmoitusta luodaan, siitä luodaan "content/activities" -kansioon
        uusi kansio, jonka nimi on sen "title":n ensimmäisen sanan ja "title":n kirjainten
        määrän päivän yhdistelmä, jotka on eroteltu "-".
        Kansiossa on kaikki siihen liittyvä sisältö.
    -->
    <!-- id = title first word + day of date -->

    <div class="admin-panel">
        <div class="anchors">
            <div class="control">
                <img src="./img/button-arrow.png" alt="Pienennä ohjauspaneeli">
            </div>
            <div class="prop">
                <h2>Pääsivu</h2>
                <h4>Aukioloajat</h4>
                <h4>Hinnasto</h4>
                <h4>Ilmoistukset</h4>
                <h4>Galleria</h4>
            </div>
            <div class="help">
                <a href="./content/uploads/yleistiedotenetti2020.pdf" target="#">Tarvitsetko apua? Lue manuaali.</a>
            </div>
        </div>
        <div class="content">
            <form action="schedule_post.php" method="post" id="schedule">
                <h1>Aukioloajat</h1>
                <ul>
                    <li class="item">
                        <h1>Ma</h1>
                        <div class="time">
                            <input type="number" min="0" max="23" placeholder="23">:
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li class="item">
                        <h1>Ti</h1>
                        <div class="time">
                            <input type="number" min="0" max="23" placeholder="23">:
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li class="item">
                        <h1>Ke</h1>
                        <div class="time">
                            <input type="number" min="0" max="23" placeholder="23">:
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li class="item">
                        <h1>To</h1>
                        <div class="time">
                            <input type="number" min="0" max="23" placeholder="23">:
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li class="item">
                        <h1>Pe</h1>
                        <div class="time">
                            <input type="number" min="0" max="23" placeholder="23">:
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li class="item">
                        <h1>La</h1>
                        <div class="time">
                            <input type="number" min="0" max="23" placeholder="23">:
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                    <li class="item">
                        <h1>Su</h1>
                        <div class="time">
                            <input type="number" min="0" max="23" placeholder="23">:
                            <input type="number" min="0" max="59" placeholder="00">
                        </div>
                    </li>
                </ul>
                <input type="submit" value="Tallenna ajan muutos">
            </form>

            <h1>Luo uusi ilmoitus</h1>
            <select name="" id="activity-select">
                <option value="0">Tapahtumailmoitus</option>
                <option value="1">Kilpailuilmoitus</option>
                <option value="2">Linkki sivustolle</option>
            </select>

            <form action="" method="post" id="events">
                <h1>Luo uusi tapahtumailmoitus</h1>
            </form>

            <form action="" method="post" id="competitions">
                
                <h1>Luo uusi kilpailuilmoitus</h1>
                
                <div class="a-title">
                    <input type="text" required placeholder="Ilmoituksen otsikko...">
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
                    <input type="button" value="+">
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

            </form>

            <form action="" method="post" id="links">
                
                <h1>Luo uusi linkki-ilmoitus</h1>

            </form>

            <form action="./admin/gallery_post.php" method="post" enctype="multipart/form-data" id="gallery">
                
                <h1>Muokkaa Galleriaa</h1>
                <input type="file" name="gallery-images[]" multiple id="file-input">
                <input type="submit" value="Lisää uudet kuvat">

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

</footer>

</html>