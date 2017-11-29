<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hacker News</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet">
  </head>
  <body>
    <div>
      {% for item in list %}
        <p>{{ helper.relativeTime(item.time) }}</p>
        <div>
          <a href="{{ item.url }}">{{ item.title }}</a>
        </div>
      {% endfor %}
    </div>
  </body>
</html>