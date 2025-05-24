% Danh sách món ăn và nguyên liệu
recipe(pasta, [noodle, tomato_sauce, cheese]).
recipe(fried_rice, [rice, egg, soy_sauce, carrot]).
recipe(salad, [lettuce, tomato, cucumber, olive_oil]).

% Các nguyên liệu thay thế được chấp nhận
replacement(tomato_sauce, ketchup).
replacement(olive_oil, vegetable_oil).

% Kiểm tra nguyên liệu có sẵn hoặc có thể thay thế
ingredient_available(Ingredient, AvailableList) :-
    member(Ingredient, AvailableList).

ingredient_available(Ingredient, AvailableList) :-
    replacement(Ingredient, Substitute),
    member(Substitute, AvailableList).

% Gợi ý món ăn nếu tất cả nguyên liệu đều có sẵn hoặc có thể thay thế
suggest_recipe(AvailableIngredients, RecipeName) :-
    recipe(RecipeName, Ingredients),
    forall(member(I, Ingredients), ingredient_available(I, AvailableIngredients)).
