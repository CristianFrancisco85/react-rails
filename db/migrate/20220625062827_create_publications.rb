class CreatePublications < ActiveRecord::Migration[6.1]
  def change
    create_table :publications do |t|
      t.string :image
      t.string :comentario, null: false
      t.string :tags
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
