from pydantic import BaseModel


class WishBase(BaseModel):
    type: str
    contentTypeId: str
    contentId: str
