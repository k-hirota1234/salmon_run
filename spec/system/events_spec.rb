require 'rails_helper'

describe 'Events', type: :system, elasticsearch: true do
  before :all do
    Weapon.create_index!
    Weapon.import
  end

  context 'with show action' do
    it 'To show h1 content' do
      events_weapon = FactoryBot.create :events_weapon
      stage = events_weapon.event.stage

      visit stage_path(stage)
      expect(page).to have_content 'すぷらとぅーん2 サーモンラン'
    end

    it 'To Show stage informations' do
      events_weapon = FactoryBot.create :events_weapon
      stage = events_weapon.event.stage

      visit stage_path(stage)
      expect(page).to have_content stage.name
    end
  end
end
