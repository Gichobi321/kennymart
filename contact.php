<!DOCTYPE html>
<html lang="en">
<head>
<?php include './components/header.php';?>
</head>

<body>

    <div id="wrapper">
        <header class="market-header header">
            <?php include './components/nav.php';?>
        </header><!-- end market-header -->

        <section class="section lb" style= "margin-top: 80px;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12 col-xs-12">
                        <div class="sidebar">
                        <?php include './components/recent.php';?>
                        </div><!-- end sidebar -->
                    </div><!-- end col -->
                    
                    <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <div class="page-wrapper">
                            <div class="row">

                                <div class="col-lg-6">
                                    <h4>How we help?</h4>
                                    <p>If you’d like to write for us, advertise with us</a> or just say hello, fill out the form below and we’ll get back to you as soon as possible.</p>
                                </div>
                            </div><!-- end row -->

                            <hr class="invis">

                            <div class="row">
                                <div class="col-lg-12">
                                    <form class="form-wrapper" action="https://formspree.io/f/xvodvqvr" method="POST">
                                    <h4>Contact Us</h4>
                                        <input name ="name" type="text" class="form-control" placeholder="Your name" required>
                                        <input name="email"type="email" class="form-control" placeholder="Email" required>
                                        <input name="phone"type="number" class="form-control" placeholder="Phone" required>
                                        <input name="name"type="text" class="form-control" placeholder="Subject" required>
                                        <textarea name="message" class="form-control" name="name" placeholder="Your message" required></textarea>
                                        <button type="submit" class="btn btn-primary">submit <i class="fa fa-envelope-open-o"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div><!-- end page-wrapper -->
                    </div><!-- end col -->
                </div><!-- end row -->
            </div><!-- end container -->
        </section>
    </div><!-- end container -->
    <?php include './components/footer.php';?>

</body>

</html>