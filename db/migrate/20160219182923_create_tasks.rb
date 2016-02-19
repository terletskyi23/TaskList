class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :body
      t.boolean :status

      t.timestamps null: false
    end
  end
end
