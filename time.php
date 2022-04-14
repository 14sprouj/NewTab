<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script>
<?
	// read .env file
	$env = file_get_contents('.env');
	$env = explode("\n", $env);
	foreach ($env as $line) {
		// explode line by =
		$line = explode('=', $line);
		if (count($line) == 2) {
			// if var contains "
			if (strpos($line[1], ',') !== false) {
				// convert to array
				$line[1] = explode(',', $line[1]);
				echo 'var ' . $line[0] . ' = [';
				$i = 0;
				foreach ($line[1] as $value) {
					if ($i > 0) {
						echo ',';
					}
					echo '"' . $value . '"';
					$i++;
				}
				echo '];';
			} else {
			// set variable
				echo 'var ' . $line[0] . ' = "' . $line[1] . '";';
			}
		}
	}
?>
</script>

time