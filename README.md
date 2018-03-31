# Infinite Slider

A slider that loops an infinite number of times.

### Installing

Include the CSS file in your \<head> tag
```html
<link rel="stylesheet" type="text/css" href="slider.css">
```

Include the script right before the end of the \<body> tag

```html
<script src="slider.js"></script>
```

Right after the include, start the app

```javascript
<script src="slider.js"></script>
<script>
    var slider = new Slider()
</script>
```
### Configuration
Configuring the app
```javascript
<script src="slider.js"></script>
<script>
    var slider = new Slider({
        container: '.slider', // Needed. Class of the slider container
        slides: '.slide', // Needed. Class of every slides
        speed: '40s' // Optional. Default 30s
    })
</script>
```
To ensure the good functioning of the script, please follow this HTML structure for the slider

```html
<div class="slider-container">
    <ul class="slider" data-direction="rtl">
        <li class="slide">
            <!-- Elements -->
        </li>
    </ul>
</div>
``` 

#### Direction of the slider
Add the attribute data-direction to the slider container to change the direction of the slider  
ltr: left to right (default)
rtl: right to left
```html
<ul class="slider" data-direction="rtl">
    <!-- Your slides -->
</ul>
``` 
## Authors

* **Martin Gagné** - *Initial work* - [martin_gagne@outlook.com](mailto:martin_gagne@outlook.com)