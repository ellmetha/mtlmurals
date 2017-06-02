"""
    Mural upload sets
    =================

    This module defines upload sets that will be used to store files or images.

"""

from flask_uploads import IMAGES
from flask_uploads import UploadSet


mural_images = UploadSet('murals', IMAGES)
