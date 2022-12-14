class CreateDrivers < ActiveRecord::Migration[6.1]
  def change
    create_table :drivers do |t|
      t.references :user, foreign_key: true
      t.string :car_make
      t.string :car_model
      t.string :car_color
      t.string :licence_plate
      t.decimal :rating
      t.integer :trip_count
      t.string :phone_number
      t.timestamps
    end
  end
end
