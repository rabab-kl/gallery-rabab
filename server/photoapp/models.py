from django.db import models

class Photo(models.Model):
    titre = models.CharField(max_length=100)
    auteur = models.CharField(max_length=100)
    date = models.DateField()
    emplacement = models.CharField(max_length=100)
    image_base64 = models.TextField()

    def __str__(self):
        return self.titre

