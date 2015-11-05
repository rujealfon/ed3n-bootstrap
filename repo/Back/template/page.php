<!DOCTYPE html>
<html class="<?php print $class; ?>">

<head>
	<title><?php $_($title); ?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<?php if(isset($meta) && is_array($meta)): ?>
    <?php foreach($meta as $name => $content): ?>
    <meta name="<?php print $name; ?>" content="<?php print $content; ?>" />
    <?php endforeach; ?>
    <?php endif; ?>

    <!-- inject:third-party-styles -->
    <link rel="stylesheet" href="/vendor/normalize.css/normalize.css">
    <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="/vendor/bootstrap/dist/css/bootstrap.css">
    <!-- endinject -->

    <!-- inject:styles -->
    <link rel="stylesheet" href="/styles/custom.css">
    <link rel="stylesheet" href="/styles/zmedia.css">
    <!-- endinject -->
</head>

<body>
	<section class="page">
        <section class="head"><?php echo $head; ?></section>
        <section class="body"><?php echo $body; ?></section>
        <section class="foot"><?php echo $foot; ?></section>
    </section>
</body>
    <!-- inject:third-party-scripts -->
    <script src="/vendor/jquery/dist/jquery.min.js"></script>
    <script src="/vendor/bootstrap/dist/js/bootstrap.min.js"></script>
    <!-- endinject -->

    <!-- inject:scripts -->
    <script src="/scripts/global.js"></script>
    <!-- endinject -->   
</html>
