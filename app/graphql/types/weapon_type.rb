module Types
  class WeaponType < Types::BaseObject
    field :name, String, null: false
    field :image_url, String, null: true
  end
end
